import re
import numpy as np
import pandas as pd
import operator

# This is used in able to coalesce all the listings that 
# are not in a cluster, into one. 
# It does this by going through all clusters, then 
# finding out 


combined_listings = pd.read_csv("sold_unsold_cluster.csv")


df = pd.DataFrame(columns=['cluster_id', 'cluster_name', 'title', 'total_price', 'condition', 'details', 'num_images', 'target'])

for index, row in combined_listings.iterrows():
	current_cluster_id = row.iloc[0];
	current_title = row.iloc[2];
	current_total_price = row.iloc[3];
	current_cond = row.iloc[4]
	current_details = row.iloc[5]
	current_num_images = row.iloc[6];
	current_target = row.iloc[7]
	current_cluster_name = row.iloc[11]
	new_series = [current_cluster_id, current_cluster_name, current_title, current_total_price, current_cond, current_details,current_num_images,current_target]
	
	#print current_cluster_id
	df.loc[len(df) + 1] = new_series
df.sort(columns="cluster_id", inplace=True)

# find the min and max cluster values
#min_value = df.iloc[1, 0];
max_value = df.iloc[len(df) - 1, 0];

#print df

#print min_value;
#print max_value;

max_cluster_val = -1;
best_cluster_accuracy = 0;
best_cluster_name = "";
best_cluster_id = 0;
running_count = 0;

for i in range(max_value + 1):
	current_cluster = df[df["cluster_id"] == i]
	running_count += len(current_cluster);
	if len(current_cluster) == 1:
		if (max_cluster_val == -1):
			max_cluster_val = i - 1;
		# strip away extraneous characters, and special characters
		# and sega saturn
		current_name = current_cluster.iloc[0,2];
		current_name = current_name.lower()
		current_name = re.sub(r'[^a-zA-Z0-9_\s]', ' ', current_name)
		current_name = re.sub(r'complete', ' ', current_name);
		current_name = re.sub(r'cib', ' ', current_name);
		current_name = re.sub(r'nib', ' ', current_name);
		current_name = re.sub(r'complete\s+in\+box', ' ', current_name);
		#print current_name
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

		for j in range(max_cluster_val + 1):
			clusters = df[df["cluster_id"] == j]
			#if i == 18:
			cluster_name = clusters.iloc[0,1];
			cluster_name = re.sub(r'sega saturn', ' ', cluster_name)
		
			cluster_name = cluster_name.split();
			cluster_name = set(cluster_name);
			union_set = cluster_name.union(current_name);
			intersection_set = cluster_name.intersection(current_name);
			current_percent = float(len(intersection_set))/float(len(union_set));
			
			# Use the Jaccard distance
			if (current_percent > best_cluster_accuracy):
				best_cluster_accuracy = current_percent;
				best_cluster_name = cluster_name;
				best_cluster_id = j;

		df.iloc[running_count - 1, 0] = best_cluster_id;
		best_cluster_accuracy = 0;
		best_cluster_name = "";
		best_cluster_id = 0;

df.sort(columns="cluster_id", inplace=True)
df.to_csv("cluster_fix.csv")