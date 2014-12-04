import re
import os
import pandas as pd

def remove_tab(s):
    return re.sub(r'\t', ' ', s)


new_df = pd.DataFrame(columns=['title', 'total_price', 'condition', 'details', 'num_images', 'item_number'])

current_dir = '/home/terrapin/datascience-fall14/big_project/current_listings/'

def add_dir2(line):
    current_dir = current_dir = '/home/terrapin/datascience-fall14/big_project/current_listings/'
    return current_dir + line;


files = [f for f in os.listdir(current_dir) 
         if os.path.isfile(os.path.join(current_dir, f)) ]

files2 = map(add_dir2, files);


p = re.compile(r"}</style><script.*");
title_pattern = re.compile(r'<a href="http://www.ebay.com/itm.*');
title_pattern2 = re.compile(r'<span class="name">.*')
title_pattern3 = re.compile(r'<link rel="stylesheet" href=".*')
title = "";
item_number = r'^.*eBay item number:.*'
current_item_number = "";
price = re.compile(r"^.*US \$[\d+].*")
description_pattern = re.compile(r'^.*<meta name="description" content.*');
description_pattern2 = re.compile(r'.*<meta name="description".*')
shipping_check = re.compile(r'^.*<div id="isum-shipCostDiv".*');
detailed_description = re.compile(r'^.*<table width="100%"><tbody>.*')
description_pattern3 = re.compile(r'^.*<p class="itemDescription">.*');
more_details_pattern = re.compile(r'^.*<td class="sellerNotesContent">.*')
free = re.compile("^.*Free.*");
us_price2 = re.compile(r'^.*US\s*\$\d+\.\d+')
title_more = re.compile(r'^.*<h1 class="it-ttl" itemprop="name" id="itemTitle">.*')
meta_crap = re.compile(r'^.*<meta property.*')

vary_check = re.compile(r'^.*Varies</div>')
vary_shipping = re.compile(r'^.*Varies based on location and shipping method')
image_check = re.compile(r'^.*maxImageUrl.*')
img_carousel = re.compile(r'^.*new enImgCarousel.*')
widgets = re.compile(r'^.*\$rwidgets.*')
price_pattern_more = re.compile(r'^.*\d+\.\d+')
shipping_pattern_span = re.compile(r'^.*<span>\$\d+\.\d+.*</span>')
new_title_pattern = re.compile(r'^.*<meta name="msvalidate.01".*')
find_content = re.compile(r'^.*content=.*in Video Games')
us_price = re.compile(r'^.*<span class="notranslate".*US\s*\$\d+\.\d+')    
shipping_pattern_span2 = (r'.*var shElemntArry.*')

condition_pattern = (r'^.*<div class="u-flL condText.*')
not_specified = (r'^.*not specified.*')    


for f in files2:
    with open(f) as openfile:

        title = "";
        price2 = "";
        shipping = "";
        description = "";
        condition = "";
        inner_description = "";
        details = "";
        num_images = 0;
        current_item_number = "";

        s = "";
        for line in openfile:
            if (re.match(p, line)):
                if (title == ""):
                    s = re.match(p,line)
                    t = s.group(0)
                    t = re.sub(r'[^a-zA-Z0-9]', " ", t)
                    t = re.sub(r'.*src.', ' ', t)
                    t = re.sub(r'eBay.*', ' ', t)
                    title = t;
            if (re.match(price,line)):
                if (price2 == ""):
                    s = re.match(price,line)
                    t = s.group(0)
                    t = re.sub(r'.*US', ' ', t)
                    t = re.sub(r'Good.*', ' ', t)
                    t = re.sub(r'Like.*', ' ', t)
                    t = re.sub(r'Accept.*', ' ', t)
                    t = re.sub(r'".*', ' ', t)
                    if (re.match(price_pattern_more,t)):
                        x = re.match(price_pattern_more, t)
                        price2 = x.group(0);
                    else:
                        price2 = t
            if (re.match(item_number, line)):
                if (current_item_number == ""):
                    curr = re.sub(r'eBay item number:</div><div class="u-flL iti-act-num">', ' ', line, 1)
                    curr = re.sub(r'</div>', ' ', curr, 1)
                    curr = re.sub(r'\s+', ' ', curr)
                    curr = re.sub(r'\n', ' ', curr, 1)               
                    current_item_number = curr;
            if (re.match(us_price,line)):
                if (re.match(r'^\s+', price2)):
                    s = re.match(us_price,line)
                    t = s.group(0)
                    t = re.sub(r'.*US', ' ', t)
                    price2 = t
            if (re.match(us_price2,line)):
                if (not(re.match(r'\$\d+\.\d+', price2))):
                    s = re.match(us_price2,line)
                    t = s.group(0)
                    t = re.sub(r'.*US', ' ', t)
                    price2 = t
            
            if (re.match(shipping_check,line)):
                if (shipping == ""):
                    s = re.match(shipping_check, line)
                    t = s.group(0)
                    t = re.sub(r'.*\+', ' ', t)
                    t = re.sub(r'shipping.*', ' ', t)
                    shipping = t
                if (re.match(free,line)):
                    shipping = "$0.00";
            if (re.match(shipping_pattern_span,line)):
                if (shipping == ""):
                    s = re.match(shipping_pattern_span, line)
                    t = s.group(0)
                    t = re.sub(r'.*<span>', ' ', t)
                    t = re.sub(r'</span>.*', ' ', t)
                    shipping = t
            if (re.match(shipping_pattern_span2,line)):
                #print title
                #print line
                if (shipping == ""):
                    s = re.match(shipping_pattern_span2, line)
                    t = s.group(0)
                    #print t
                    #t = re.sub(r'.*<span>', ' ', t)
                    #t = re.sub(r'</span>.*', ' ', t)
                    #print t
                    shipping = t
                    #print title
                    if (re.match(free,t)):
                        shipping = "$0.00";
                    #print 'shipping is ', shipping
            if (re.match(detailed_description, line)):
                s = re.match(detailed_description, line)
                t = s.group(0)
                t = re.sub(r'<table.*-->', ' ', t)
                t = re.sub(r'<table cellpadding.*width="100%">', ' ', t)
                t = re.sub(r'<tbody>', ' ', t)
                t = re.sub(r'<tr>', ' ', t)
                t = re.sub(r'<td colspan="2">', ' ', t)
                t = re.sub(r'<font face.*size="2"><b>Product Information</b>', ' ', t, 1)
                t = re.sub(r'</font></td></tr>', ' ', t, 1)
                t = re.sub(r'<font face=',' ', t, 1)
                t = re.sub(r'"Arial, Helvetica, sans-serif" size="2">', ' ', t, 1)
                t = re.sub(r'</font>.*', ' ', t, 1)
                t = re.sub(r'.*<font face="Arial, Helvetica, sans-serif" size="2">', ' ', t, 1)
                details = t;
            if (re.match(title_pattern3, line)):
                if (title == ""):
                    s = re.match(title_pattern3, line)
                    t = s.group(0)
                    t = re.sub(r'<link.*href="./', ' ', t, 1)
                    t = re.sub(r'eBay.*', ' ', t,1)
                    title = t
            if (re.match(description_pattern2, line)):
                s = re.match(description_pattern2,line)
                t = s.group(0)
                t = re.sub(r'<meta name="\w+\.\w+" content="\w+">', ' ', t, 1)
                t = re.sub(r'<meta name="\w+\-\w+" content="\w+">', ' ', t, 1)
                t = re.sub(r'<meta name="\w+\-\w+" content="\w+">', ' ', t, 1)
                t = re.sub(r'<meta name="\w+\_\w+" content="\w+">', ' ', t, 1)
                t = re.sub(r'<meta name="\w+" content="', ' ', t, 1)
                t = re.sub(r'">.*og:description"', ' ', t)
                t = re.sub(r'content="', ' ', t)
                t = re.sub(r'">.*', ' ', t)
                inner_description = t;   
            if (re.match(more_details_pattern,line)):
                s = re.match(more_details_pattern,line)
                t = s.group(0)
                t = re.sub(r'<td class.*<span class="\w+">', ' ', t)
                t = re.sub(r'</span.*', ' ', t)
                inner_description = inner_description + t
            if (re.match(vary_shipping,line) or re.match(vary_check,line)):
                shipping = "$6.45"
            if (re.match(description_pattern3, line)):
                s = re.match(description_pattern3,line);
                t = s.group(0)
                t = re.sub(r'<p.*class="topItmCndDscMsg">', ' ', t, 1)
                t = re.sub(r'</span.*>' ,' ', t)
                description = t
            if (re.match(widgets,line)):
                s = re.match(widgets,line);
                t = s.group(0)
                t = re.sub(r'^.*{"id":"vi_pic_panel', ' ', t, 1)
                num_images = t.count('maxImageUrl', 0, len(t))
            if (re.match(new_title_pattern,line)):
                if (title == ""):
                    s = re.match(new_title_pattern,line)
                    t = s.group(0)
                    t = re.sub(r'^.*<meta name="msvalidate.01".*<meta name="yandex-verification"', ' ', t, 1)
                    t = re.sub(r'^.*content=.*<meta name="description"', ' ', t, 1)
                    t = re.sub(r'^\s+content="', ' ', t, 1)
                    t = re.sub(r'in Video Games.*', ' ', t, 1)
                    title = t
            if (re.match(condition_pattern,line)):
                if (condition == ""):
                    s = re.match(condition_pattern,line)
                    t = s.group(0)
                    t = re.sub(r'<div class="u-flL condText  " id="vi-itm-cond">', ' ', t, 1)
                    t = re.sub(r'</div>', ' ', t, 1)
                    if (re.match(not_specified, t)):
                        t = "Not Specified"
                    else:
                        condition = t
            if (re.match(title_more, line)):
                if (re.match(meta_crap,title)):
                    s = re.match(title_more,line)
                    t = s.group(0)
                    t = re.sub(r'<h1.*</span>', ' ', t, 1)
                    t = re.sub(r'</h1>', ' ', t, 1)
                    title = t
    #description = description + ' ' + inner_description
    #if (re.match(free,t)):
     #   shipping = "$0.00";            
    title = remove_tab(title)
    price2 = remove_tab(price2)
    shipping = remove_tab(shipping)
    condition = remove_tab(condition)
    if (re.match(not_specified, condition)):
        condition = "Not Specified"
    details = remove_tab(details)
    price2 = re.sub(r'.*\$', ' ', price2, 1);
    shipping = re.sub(r'^.*\$', ' ', shipping, 1);
    if (re.match(r'^.*EUR.*', shipping)):
        val = re.sub(r'^.*EUR', ' ', shipping,1);
        shipping = float(val) * (1.25);

    #print price2
    #print shipping
    total_price = round(float(price2) + float(shipping),2);
    
    new_series = [title, total_price, condition, details, num_images, current_item_number]
    new_df.loc[len(new_df) + 1] = new_series
new_df.to_csv("current_listings_item_number.csv")
