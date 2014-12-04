var sliderwidth=0;
var startaction="";
var xCount=0;
function buildFrooGallery() {
	var scroller1, scroller2, maxWid=0; 
	var q="'"; 
	xCount=0; 
	newImage = 'http://xglobal.froo.com/img/gallery-wrap-'+designid+'.gif';
	document.getElementById('froo-gallery-wrap').style.background = 'url('+newImage+') no-repeat';
	document.getElementById('froo-gallery-wrap').style.height = "340px";
	document.getElementById('froo-gallery-wrap').style.width = "600px";
	document.getElementById('froo-gallery-wrap').style.marginTop = "20px";
	var ScrollImages=new Array(); 
	for (var i=0; i<=ListingNum.length; i++){
		if (ListingNum[i]){
			xCount++;
			
			//Update for Smart Social - will only run on Smart Social results page
			if (typeof FSSresult !== 'undefined') {
				ListingView[i] = FCS_link_pt1+"_crossell"+conv_trackingid+""+FCS_link_pt2+""+ListingNum[i]+""+FCS_link_pt3;
			 }
			
			ScrollImages[xCount]='<td id="tbl_cell_'+xCount+'" name="tbl_cell_'+xCount+'" class="sq_holder" valign="top" width="120px" height="120px" onmouseover="highlightIt('+xCount+','+q+q+');" onmouseout="noHighLight('+xCount+');">'+
				'<table cellspacing="0px cellpadding="0px" border="0" width="100%"><tr style="height:3px;"><td></td></tr><tr><td align="center" colspan="3">'+
				'<a class="listingTitle" href="' + ListingView[i] + '" target="_blank">'+
				'<img onload="resizeThb(this);" id="picid'+i+'" src="http://thumbs.ebaystatic.com/pict/'+ListingNum[i]+'.jpg" hspace="2" vspace="4" border="0" '+
				' title="" alt="'+ListingNum[i]+'" /></a></td></tr>'+
				'<tr><td style="width:3px;"></td><td align="center"><a class="listingTitle" href="' + ListingView[i] + '" target="_blank">' + ListingTitle[i] + '</a></td><td style="width:3px;"></td></tr>' +
				'</table></td>';
		}
	};
	sliderwidth=(xCount)*120;
	var gallerywidth=(xCount)*120;
	var xstrip='<table cellspacing="0px" cellpadding="0px" border="0" width="'+sliderwidth+'px"><tr>'+ScrollImages.join("")+'</tr></table>';

	xHTML ='<div id="froo-gallery-inner">';
	xHTML+='<table id="froo-gallery-table" align="center" border="0" cellspacing="0" cellpadding="0" width="100%">'
	xHTML+='<tr><td valign="top" align="center"><div style="position:relative;width:530px;height:120px;overflow:hidden;">';
	xHTML+='<div style="position:absolute;left:0px;top:0px;width:530px;height:120px;" onMouseover="scrollamount=0" onMouseout="scrollamount=-1">';
	xHTML+='<div id="froo-slide1" style="position:absolute;left:0px;bottom:0px;top:0px;"><img src="http:/sma3.froo.com/files/img/ajax-loader-bar.gif"></div>';
	xHTML+='<div id="froo-slide2" style="position:absolute;left:-'+sliderwidth+'px;bottom:0px;top:0px;"></div>';
	xHTML+='<div id="froo-hightlight" style="position:absolute;left:0px;bottom:0px;visibility:hidden;border:6px #fff solid;" onmouseout="noBulge()"></div>';
	xHTML+='</div></div></td></tr>';
	xHTML+='<tr><td align="center" valign="bottom"><table cellspacing="0" cellpadding="0" border="0" width="100%">';
	xHTML+='<td id="froo-gallery-remaining" align="left" width="115px"></td>';
	xHTML+='<td id="froo-gallery-label" align="center" width="300px"></td>';
	xHTML+='<td id="froo-gallery-price" align="right" width="115px"></td>';
	xHTML+='</table></td></tr></table>';
	xHTML+='<div style="clear:both;"></div>';
	xHTML+='<div class="froo-credit" style="background:#fff;"><a class="froo-credit" href="http://www.froo.com/xsell/?ref=cross" target="_blank"><img src="http://xglobal.froo.com/img/froocredit.jpg" border="0" /><br/>Free Gallery from Frooition<br/>Visit Froo for seller productivity apps</a></div>';
	xHTML+='<div style="clear:both;height:60px;">&nbsp;</div></div>';
	
	document.getElementById('froo-gallery-wrap').innerHTML=xHTML;
	scroller1=document.getElementById("froo-slide1");
	scroller2=document.getElementById("froo-slide2");
	scroller1.innerHTML=xstrip;	
	scroller2.innerHTML=xstrip;
	scroller2.style.left=""+sliderwidth+"px";  	
	document.getElementById("froo-gallery-label").innerHTML=message;
	if (xCount>=5) {
		startaction=setInterval("slideleft()",parseInt(scrollspeed));
	}
}

function resizeThb(elem) {
	maxheight=70;
	maxwidth=100;
	elem.height=maxheight;
	if (elem.width>maxwidth) {
		elem.width=maxwidth;
	}
}

function slideleft(){
	var scrollamount=-1; 
	scroller1=document.getElementById("froo-slide1");
	scroller2=document.getElementById("froo-slide2");
	
	if (parseInt(scroller1.style.left)>(sliderwidth*(-1)))  
	  {scroller1.style.left=(parseInt(scroller1.style.left)+scrollamount)+"px"}
	else
	  {scroller1.style.left=(parseInt(scroller2.style.left)+sliderwidth+scrollamount)+"px"}
	if (parseInt(scroller2.style.left)>(sliderwidth*(-1)))  
	  {scroller2.style.left=(parseInt(scroller2.style.left)+scrollamount)+"px"}
	else
	  {scroller2.style.left=(parseInt(scroller1.style.left)+sliderwidth)+"px"}
};
 
 function highlightIt(num,label){
	tblElement = "tbl_cell_"+num;
	clearInterval(startaction);
	var imgs=document.getElementsByName(tblElement);
	for (var x=0; x<=imgs.length; x++){
		if(imgs[x]) {
			imgs[x].style.backgroundImage="url("+"http://xglobal.froo.com/img/sq_holder_highlight.png"+")";
		}
	}
	document.getElementById("froo-gallery-remaining").innerHTML="Time Left: "+ListingTimeLeft[num];
	document.getElementById("froo-gallery-label").innerHTML=ListingTitle[num];
	if(ListingBIN[num]!="") {
		document.getElementById("froo-gallery-price").innerHTML="<div style='position:relative;float:left;top:2px;'><img src='http://xglobal.froo.com/img/bin_12x46.gif' border='0' /></div><div style='position:relative;float:right;'>"+parseFloat(ListingBIN[num]).toFixed(2)+"</div>";
	} else {
		document.getElementById("froo-gallery-price").innerHTML="Current Price: "+parseFloat(ListingCurrentPrice[num]).toFixed(2);
	}
 };
 
 function noHighLight(num) {
	if (xCount>=5) {
		startaction=setInterval("slideleft()",parseInt(scrollspeed));
	}
	document.getElementById("froo-gallery-remaining").innerHTML="";
	document.getElementById("froo-gallery-label").innerHTML=message;
	document.getElementById("froo-gallery-price").innerHTML="";
	tblElement = "tbl_cell_"+num;
	tblElement = "tbl_cell_"+num;
	var imgs=document.getElementsByName(tblElement);
	for (var x=0; x<=imgs.length; x++){
		if(imgs[x]) {
			imgs[x].style.backgroundImage="url("+"http://xglobal.froo.com/img/sq_holder.png"+")";
		}
	}
 }
 