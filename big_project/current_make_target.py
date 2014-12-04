import re
import numpy as np
import pandas as pd
import operator

current_listings = pd.read_csv('current_listings_item_number.csv')
current_listings_target = pd.read_csv('current_listings_sold.csv')

#not_sold_listings = pd.read_csv('not_sold_listings.csv');
combined_df = pd.DataFrame(columns=['title', 'total_price', 'condition', 'details', 'num_images', 'target',])

item_number = r'^.*eBay item number:.*'

# put all the item numbers and sold listings into a dict
d = dict();
for index,row in current_listings_target.iterrows():
	d[row.iloc[1]] = row.iloc[2];


	

for index, row in current_listings.iterrows():
	current_target = d[row.iloc[6]];
	combined_df.loc[len(combined_df) + 1] = row;
	combined_df.ix[len(combined_df), 'target'] = current_target;
	#current_item_number = row.iloc[6];
	#print current_item_number;
	#print row;


#for index, row in sold_listings.iterrows():
#	combined_df.loc[len(combined_df) + 1] = row
#	combined_df.ix[len(combined_df), 'target'] = 1
	

#print combined_df

#for index, row in not_sold_listings.iterrows():
#	combined_df.loc[len(combined_df) + 1] = row
#	combined_df.ix[len(combined_df), 'target'] = 0

combined_df.to_csv("combined_current_target.csv")