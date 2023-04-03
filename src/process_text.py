import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string

# Load stop words
nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

# Load punctuation
punctuation = set(string.punctuation)

# Define a function to clean the text
def clean_text(text):
    # Tokenize the text
    words = word_tokenize(text)
    
    # Lowercase the words
    words = [word.lower() for word in words]
    
    # Remove stop words and punctuation
    words = [word for word in words if word not in stop_words and word not in punctuation]
    
    # Join the words back to form a string
    cleaned_text = " ".join(words)
    
    return cleaned_text