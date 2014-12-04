import re
import numpy as np
import pandas as pd
#import operator

# This is used in able to be price guide estimate, by 
# checking against the 

df = pd.read_csv("cluster_fix.csv")
price_guide = pd.read_csv("price_guide.csv");

max_value = df.iloc[len(df) - 1, 0];

#print df

#print min_value;
#print max_value;

#new_df = pd.DataFrame()

d = dict();

max_cluster_val = -1;
best_cluster_accuracy = 0;
best_cluster_name = "";
best_cluster_id = 0;
running_count = 0;

df2 = df.groupby("cluster_id", axis=1);
print df2.sum();
#print df2;


#for i in range(max_value + 1):
#	current_cluster = df[df["cluster_id"] == i]
#	running_count += len(current_cluster);
	#if len(current_cluster) == 1:
	#	if (max_cluster_val == -1):
	#		max_cluster_val = i - 1;
		# strip away extraneous characters, and special characters
		# and sega saturn
#	if len(current_cluster) >= 1:
#		current_name = current_cluster.iloc[0,2];
#		current_name = current_name.lower()
#		current_name = re.sub(r'[^a-zA-Z0-9_\s]', ' ', current_name)
#		current_name = re.sub(r'complete', ' ', current_name);
#		current_name = re.sub(r'cib', ' ', current_name);
#		current_name = re.sub(r'nib', ' ', current_name);
#		current_name = re.sub(r'complete\s+in\+box', ' ', current_name);
#		#print current_name
#		if (not(re.match(r'^\s*sega saturn', current_name))):
#			current_name = re.sub(r'sega saturn', ' ', current_name)
#		current_name = re.sub(r'manual', ' ', current_name);
#		current_name = re.sub(r'original case', ' ', current_name);
#		current_name = re.sub(r'amp', ' ', current_name);
#		current_name = re.sub(r'manual', ' ', current_name);
#		current_name = re.sub(r'excellent condition', ' ', current_name)
#		current_name = re.sub(r'free.*shipping', ' ', current_name)
#		current_name = re.sub(r'in great condition', ' ', current_name)
#		current_name = re.sub(r'\s\s', ' ', current_name);
#		current_name = re.sub(r'^\s', '', current_name);
#		current_name = re.sub(r'game', ' ', current_name)
#		current_name = re.sub(r'disc only', ' ', current_name)

#		current_name = re.sub(r'disk only', ' ', current_name)
#		current_name = re.sub(r'box', ' ', current_name);
#		current_name = re.sub(r'near mint', ' ', current_name)
#		current_name = re.sub(r'rare', ' ', current_name)
#		current_name = re.sub(r'\s+for\s+', ' ', current_name)
#		d[current_name] = [];
#print d;		