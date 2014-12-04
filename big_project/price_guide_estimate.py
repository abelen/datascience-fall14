import re
import numpy as np
import pandas as pd
import operator

# This is used in able to be price guide estimate, by 
# checking against the 

cluster_listings = pd.read_csv("cluster_fix.csv")
price_guide = pd.read_csv("price_guide.csv");
best_cluster_accuracy = 0;
best_cluster_name = "";
best_row =0;
running_count = 0;

max_value = cluster_listings.iloc[len(cluster_listings) - 1, 1];
#print max_value

d = dict();

for i in range(max_value + 1):
	
	current_cluster = cluster_listings[cluster_listings["cluster_id"] == i]
	running_count += len(current_cluster);
	# strip away extraneous characters, and special characters
	# and sega saturn
	current_name = current_cluster.iloc[0,2];
	current_name = current_name.lower()
	current_name = re.sub(r'[^a-zA-Z0-9_\s]', ' ', current_name)
	current_name = re.sub(r'complete', ' ', current_name);
	current_name = re.sub(r'cib', ' ', current_name);
	current_name = re.sub(r'nib', ' ', current_name);
	current_name = re.sub(r'complete\s+in\+box', ' ', current_name);
	current_name = re.sub(r'sega saturn', ' ', current_name)
	current_name = re.sub(r'manual', ' ', current_name);
	current_name = re.sub(r'original case', ' ', current_name);
	current_name = re.sub(r'amp', ' ', current_name);
	current_name = re.sub(r'manual', ' ', current_name);
	current_name = re.sub(r'excellent condition', ' ', current_name)
	current_name = re.sub(r'free.*shipping', ' ', current_name)
	current_name = re.sub(r'in great condition', ' ', current_name)
	current_name = re.sub(r'\s\s', ' ', current_name);
	current_name = re.sub(r'^\s', '', current_name);
	current_name = re.sub(r'game', ' ', current_name)
	current_name = re.sub(r'disc only', ' ', current_name)
	current_name = re.sub(r'disk only', ' ', current_name)
	current_name = re.sub(r'box', ' ', current_name);
	current_name = re.sub(r'near mint', ' ', current_name)
	current_name = re.sub(r'rare', ' ', current_name)
	current_name = re.sub(r'\s+for\s+', ' ', current_name)
	current_name = current_name.split();
	current_name = set(current_name);

	for index,row in price_guide.iterrows():
		
		title_name = row.ix[1]
						
		title_name = title_name.lower()
		split_name = title_name.split();
		split_name = set(split_name);
		union_set = split_name.union(current_name);
		intersection_set = split_name.intersection(current_name);
		current_percent = float(len(intersection_set))/float(len(union_set));
			
			# Use the Jaccard distance
		if (current_percent > best_cluster_accuracy):
			best_cluster_accuracy = current_percent;
			best_cluster_name = title_name;
			best_row = row.ix[0];

	d[i] = (best_row, best_cluster_name)
	best_cluster_accuracy = 0;
	best_cluster_name = "";
	best_cluster_id = 0;

# for every game that is sold and unsold, we need to compare that price 
# to the expected value, i.e. the price guide price
# After that we create entries for the price differences
# and then insert all the quantified values into a DataFrame
# which then be used for learning algorithms 

quantified_df = pd.DataFrame(columns=['num_of_buzzwords', 'price_difference', 'condition_val', 'detailsYN', 'num_images', 'target',])
for index,row in cluster_listings.iterrows():
	current_row = row;
	current_cluster = row.ix[1];
	price_row = price_guide.ix[current_cluster];
		

#print d