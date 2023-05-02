import pandas as pd
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import pyLDAvis
import pyLDAvis.sklearn

# Read the pandas DataFrame
df = pd.read_csv('data/cleaned_pldb.csv')

# Vectorize the text data
vectorizer = CountVectorizer()
data_vectorized = vectorizer.fit_transform(df['wikipedia.summary'])

# Train the LDA model
lda_model = LatentDirichletAllocation(n_components=10, random_state=42)
lda_model.fit(data_vectorized)

# Prepare and save the pyLDAvis data for each programming language
for index, row in df.iterrows():
    title = row['title']
    summary = row['wikipedia.summary']
    
    single_data_vectorized = vectorizer.transform([summary])
    single_lda = lda_model.transform(single_data_vectorized)
    
    prepared_vis_data = pyLDAvis.sklearn.prepare(lda_model, single_data_vectorized, vectorizer, mds='tsne')
    
    # Save the pyLDAvis data as a JSON file
    with open(f'data/lda/{title}.json', 'w') as outfile:
        json.dump(prepared_vis_data.to_dict(), outfile)