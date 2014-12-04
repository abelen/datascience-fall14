import pandas as pd
import numpy as np
import re
import os
import requests
import time

# Run this file when inside the big_project folder!!!

def add_dir(line):
    current_dir = current_dir = '/home/terrapin/datascience-fall14/big_project/current_listings/'
    return current_dir + line;

def remove_tab(s):
    return re.sub(r'\t', ' ', s)

new_df = pd.DataFrame(columns=['item_number', 'soldYN'])

current_dir = '/home/terrapin/datascience-fall14/big_project/current_listings/'


files = [f for f in os.listdir(current_dir) 
         if os.path.isfile(os.path.join(current_dir, f)) ]

files2 = map(add_dir, files);

d = dict();


# first get all the item numbers from the current listings

item_number = r'^.*eBay item number:.*'
item_sold = r'^.*Item Sold.*';


for f in files2:
    with open(f) as openfile:
    	curr = "";
    	for line in openfile:
    		if (re.match(item_number,line)):
    			curr = re.sub(r'eBay item number:</div><div class="u-flL iti-act-num">', ' ', line, 1)
    			curr = re.sub(r'</div>', ' ', curr, 1)
    			curr = re.sub(r'\s+', ' ', curr)
    			curr = re.sub(r'\n', ' ', curr, 1)
    			d[curr] = 0;
    			#print curr;



html_lines = [];

for k in d.keys():
	new_str = ("http://www.ebay.com/itm/") + k + ("?ru=http%%3A%%2F%%2Fwww.ebay.com%%2Fsch%%2Fi.html%%3F_from%%3DR40%26_sacat%%3D0%26_nkw%%3D331247852937%26_rdc%%3D1")
	r = requests.get(new_str);
	r = list(r);
	for i in range(250):
		#print r[i];
		if (re.match(item_sold,r[i])):

			d[k] = 1
			print 'sold';
			break;
	print 'sleeping!';
	time.sleep(10);
	print 'awake!';

	#html_lines.append(r);
	#time.sleep(10);

	#for line in r:
	#	if (re.match(item_sold, line)):
	#		d[k] = 1;
	#		print 'sold';
	#		break;
	#print 'sleeping!';
	#time.sleep(10);
	#print 'awake!';

#print 'done getting the get requests'

#for line in html_lines:

#	item_number = "";
#	if (re.match(item_number,line)):
#		curr = re.sub(r'eBay item number:</div><div class="u-flL iti-act-num">', ' ', line, 1)
 #   	curr = re.sub(r'</div>', ' ', curr, 1)
  #  	curr = re.sub(r'\s+', ' ', curr)
   # 	curr = re.sub(r'\n', ' ', curr, 1)
    #	d[curr] = 0;

	#if (re.match(item_sold, line)):
	#	d[item_number] = 1;
	#	print 'sold';
	#	break;
	

for key, value in d.iteritems():
	new_series = [key, value]
	new_df.loc[len(new_df) + 1] = new_series;

new_df.to_csv("current_listings_sold.csv");