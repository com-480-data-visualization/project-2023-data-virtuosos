# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
|Feng Yiyang |352042 |
| | |
|Tang Xuehan |353567 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (23rd April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

> Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.
>
> Hint: some good pointers for finding quality publicly available datasets ([Google dataset search](https://datasetsearch.research.google.com/), [Kaggle](https://www.kaggle.com/datasets), [OpenSwissData](https://opendata.swiss/en/), [SNAP](https://snap.stanford.edu/data/) and [FiveThirtyEight](https://data.fivethirtyeight.com/)), you could use also the DataSets proposed by the ENAC (see the Announcements section on Zulip).

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

### Exploratory Data Analysis

**Preprocessing**:

We processed the dataset in `milestone_p1.ipynb`. We obtained the data from the PLDB database. The dataset contains information such as the programming language name, year of appearance, type, rank, fact count, last activity, example count, book count, and more. Before constructing the network, we first clean the data and prepare it for analysis. We also cleaned the Wikipedia summary text by removing stopwords, numbers, and punctuation.

**Network indicating relations between different programming languages**:

To construct the network, we first treated programming languages with the same type as similar languages. We then added an edge between two languages if they share the same type. Before constructing the network, we first take a look at the distribution of types. We found that there are several different types of programming languages in the dataset, including general-purpose, web, and database. To visualize the distribution of different types, we created a simple bar plot that shows the number of programming languages for each type, in descending order.

![Type Distribution](./image/type_distribution.png)

From above, we could see the type has a skewed distribution. Most languages have the type "pl". So if we use simply use `type` as the similarity metric, we could see several separated cliques with a large cluster in the middle (pl language).

Then we create the network. For simplicity, we just show the top 100 programming languages.

![network](./image/network.png)

We could see the resulting network has a large central cluster of "pl" languages and several smaller separated clusters.

**Word Cloud for each programming language**:

For simplicity, we select the top 10 programming languages and show their word clouds.

![wordcloud](./image/wordcloud.png)

The word cloud visualizations show the most frequent words in the summary of each programming language. The most common words, including the name and key features, provide insight into the defining characteristics of each language.


**Distribution of Different Programming Languages in a Range of Years or a Particular Year**

To explore when different programming languages occur, we create a bar chart for the years up to 1950 (excluding 1950) and a line chart for the years from 1950 onwards (including 1950).

![bar_and_line](./image/bar_and_line.png)

From the figure, we can observe that the majority of programming languages emerged after 1950. Overall, there is an upward trend in the number of programming languages appearing per year. Interestingly, some programming languages have their origins far in the past, even dating back to ancient times (even before the Common Era, BC!). For instance, The Sumerian abacus appeared between 2700 and 2300 BC. It held a table of successive columns which delimited the successive orders of magnitude of their sexagesimal (base 60) number system.[1]

[1] Ifrah, Georges (2001). The Universal History of Computing: From the Abacus to the Quantum Computer. New York, NY: John Wiley & Sons, Inc. ISBN 978-0-471-39671-0.

**Distribution of Different Programming Languages in different countries**

To investigate the geographical distribution of programming languages, we aim to display the number of programming languages originating in various countries on a map. To accomplish this, we may need to standardize country names in the raw data, as they are currently represented in an informal manner. For example, both "USA" and "United State" refer to the "United States". Additionally, a programming language may be developed collaboratively by multiple countries. Therefore, we allocate a fraction, calculated as (1/the total number of countries contributing to its development), to each participating country.

![bar_and_line](./image/global_map.png)

As illustrated in the graph, the United States is responsible for the development of the majority of programming languages. Encouragingly, numerous countries across the globe have taken part in creating programming languages, making valuable contributions to the world.

### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

## Milestone 2 (7th May, 5pm)

**10% of the final grade**


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

