import re
import numpy as np
import pandas as pd
import operator

d = dict();
sold_listings = pd.read_csv('sold_listings.csv')
not_sold_listings = pd.read_csv('not_sold_listings.csv');
current_listings = pd.read_csv('current_listings.csv')

sold_condition_dict = dict();
not_sold_condition_dict = dict();
current_condition_dict = dict();

sold_num = 0;
not_sold_num = 0;
current_num = 0;

current_words_dict = dict();
sold_words_dict = dict();
not_sold_words_dict = dict();

buzz_words = set(["cib", "nib", "complete", "new", "good", "very", 
	"instruction", "manual", "instructions" "mint", "rare"])

#"cib", "nib", "complete", "new", "good", "very good", 
#"instruction", "manual", "instructions", 
#“brand new”, "mint", "rare”, “rare condition”, 
#“works great”, “free shipping”, “good condition”, 
#“very good condition”, “disk only”, “disc only”, 
#“mint”, “working”, and “great condition”.

mint = re.compile(r'^.*mint\s+condition.*');
very_good = re.compile(r'^.*very\s+good.*');
good_condition = re.compile(r'^.*good\s+condition.*');
complete = re.compile(r'^.*complete\s+in\s+box.*');
free_shipping = re.compile(r'^.*free\s+shipping.*');


mint_count_sold = 0;
very_good_count_sold = 0;
complete_sold = 0;
good_cond_sold = 0;
free_ship_sold = 0;

mint_count_not_sold = 0;
very_good_count_not_sold = 0;
complete_not_sold = 0;
good_cond_not_sold = 0;
free_ship_not_sold = 0;

print 'sold listings'
for index, row in sold_listings.iterrows():
	#print row['condition']
	sold_num += 1;
	if row['condition'] in sold_condition_dict:
		sold_condition_dict[row['condition']] += 1
	else:
		sold_condition_dict[row['condition']] = 1

	current_title = re.sub(r'[^a-zA-Z0-9_\s]', ' ', row['title']) ;
	current_title = current_title.lower();
	#print current_title
	if (re.match(mint, current_title)):
		mint_count_sold += 1;

	if (re.match(very_good, current_title)):
		very_good_count_sold += 1;

	if (re.match(complete, current_title)):
		complete_sold += 1;

	if (re.match(good_condition, current_title)):
		good_cond_sold += 1;

	if (re.match(free_shipping, current_title)):
		free_ship_sold += 1;
	
	sold_title_words = current_title.split();
	for i in (range(len(sold_title_words))):
		if sold_title_words[i] in sold_words_dict:
			sold_words_dict[sold_title_words[i]] += 1
		else:
			sold_words_dict[sold_title_words[i]] = 1


keys_to_remove = [];



for key, value in sold_words_dict.iteritems():
	if (key not in buzz_words):
		keys_to_remove.append(key);
		#sold_words_dict.pop(key);
#print 'keys'
#print keys_to_remove
#print sold_words_dict	

for s in keys_to_remove:
	sold_words_dict.pop(s, None)



sold_condition_dict_sorted = sorted(sold_condition_dict.items(), key=operator.itemgetter(1), reverse=True)
print sold_condition_dict_sorted

sold_words_dict_sorted = sorted(sold_words_dict.items(), key=operator.itemgetter(1), reverse=True)
print sold_words_dict_sorted

print 'mint count ', mint_count_sold
print 'very good count ', very_good_count_sold
print 'complete in box count ', complete_sold
print 'good condition sold', good_cond_sold
print 'free shipping sold', free_ship_sold

for index, row in not_sold_listings.iterrows():
	#print row['condition']
	not_sold_num +=1;
	if row['condition'] in not_sold_condition_dict:
		not_sold_condition_dict[row['condition']] += 1
	else:
		not_sold_condition_dict[row['condition']] = 1
	
	#if (row['title'] != ):
	#print row['title']
	
	current_title = re.sub(r'[^a-zA-Z0-9_\s]', ' ', row['title']) ;
	current_title = current_title.lower();
	
	if (re.match(mint, current_title)):
		mint_count_not_sold += 1;

	if (re.match(very_good, current_title)):
		very_good_count_not_sold += 1;

	if (re.match(complete, current_title)):
		complete_not_sold += 1;

	if (re.match(good_condition, current_title)):
		good_cond_not_sold += 1;

	if (re.match(free_shipping, current_title)):
		free_ship_not_sold += 1;

	#print current_title
	not_sold_title_words = current_title.split();
	#if (len(not_sold_title_words) != 0):
	for i in (range(len(not_sold_title_words))):
		if not_sold_title_words[i] in not_sold_words_dict:
			not_sold_words_dict[not_sold_title_words[i]] += 1
		else:
			not_sold_words_dict[not_sold_title_words[i]] = 1

print 'not sold'

keys_to_remove = [];

for key, value in not_sold_words_dict.iteritems():
	if (key not in buzz_words):
		keys_to_remove.append(key);
		#sold_words_dict.pop(key);
#print 'keys'
#print keys_to_remove
#print sold_words_dict	

for s in keys_to_remove:
	not_sold_words_dict.pop(s, None)


not_sold_words_dict_sorted = sorted(not_sold_words_dict.items(), key=operator.itemgetter(1), reverse=True)
print not_sold_words_dict_sorted

#print not_sold_condition_dict

not_sold_condition_dict_sorted = sorted(not_sold_condition_dict.items(), key=operator.itemgetter(1), reverse=True)
print not_sold_condition_dict_sorted

print 'mint count not sold', mint_count_not_sold;
print 'very good count not sold ', very_good_count_not_sold
print 'complete not sold ', complete_not_sold;
print 'good condition not sold', good_cond_not_sold
print 'free shipping not sold', free_ship_not_sold

for index, row in current_listings.iterrows():
	#print row['condition']
	current_num +=1;
	if row['condition'] in current_condition_dict:
		current_condition_dict[row['condition']] += 1
	else:
		current_condition_dict[row['condition']] = 1

		current_title = re.sub(r'[^a-zA-Z0-9_\s]', ' ', row['title']) ;
	#print current_title
	current_title_words = current_title.split();
	#if (len(not_sold_title_words) != 0):
	for i in (range(len(current_title_words))):
		if current_title_words[i] in current_words_dict:
			current_words_dict[current_title_words[i]] += 1
		else:
			current_words_dict[current_title_words[i]] = 1

print 'current listings'

#current_words_dict_sorted = sorted(current_words_dict.items(), key=operator.itemgetter(1), reverse=True)
#print current_words_dict_sorted


current_condition_dict_sorted = sorted(current_condition_dict.items(), key=operator.itemgetter(1), reverse=True)
print current_condition_dict_sorted

#print 'current listings is ', current_num;
#print 'sold listings is ', sold_num;

#print 'not sold listings is ', not_sold_num;
