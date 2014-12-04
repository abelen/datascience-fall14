import re
import numpy as np
import pandas as pd
import operator

sold_listings = pd.read_csv('sold_listings.csv')
not_sold_listings = pd.read_csv('not_sold_listings.csv');
combined_df = pd.DataFrame(columns=['title', 'total_price', 'condition', 'details', 'num_images', 'target',])

for index, row in sold_listings.iterrows():
	combined_df.loc[len(combined_df) + 1] = row
	combined_df.ix[len(combined_df), 'target'] = 1
	

print combined_df

for index, row in not_sold_listings.iterrows():
	combined_df.loc[len(combined_df) + 1] = row
	combined_df.ix[len(combined_df), 'target'] = 0

combined_df.to_csv("combined_sold_unsold.csv")