/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.umd.assignment;

import backtype.storm.Config;
import backtype.storm.LocalCluster;
import backtype.storm.StormSubmitter;
import backtype.storm.task.ShellBolt;
import backtype.storm.topology.BasicOutputCollector;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.topology.TopologyBuilder;
import backtype.storm.topology.base.BaseBasicBolt;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Tuple;
import backtype.storm.tuple.Values;

import org.umd.assignment.spout.RandomSentenceSpout;
import org.umd.assignment.spout.TwitterSampleSpout;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.Iterator;
import java.util.Set;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;

/**
 * This topology demonstrates Storm's stream groupings and multilang capabilities.
 */
public class WordCountTopology {

  public static HashSet<String> stopWords;
  public static class SplitSentence extends ShellBolt implements IRichBolt {

    public SplitSentence() {
      super("python", "splitsentence.py");
    }

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
      declarer.declare(new Fields("word"));
    }

    @Override
    public Map<String, Object> getComponentConfiguration() {
      return null;
    }
  }

  public static class WordCount extends BaseBasicBolt {
    Map<String, Integer> counts = new HashMap<String, Integer>();
    TreeMap<String,Integer> sortedCounts = new TreeMap<String,Integer>();

    @Override

    public void execute(Tuple tuple, BasicOutputCollector collector) {
      
		// ----------------- Task 2	---------------------------------
		//
		//
		//	Modify this code to exclude stop-words from counting.
		//  Stopword list is provided in the lab folder. 
		//
		//
		// ---------------------------------------------------------


		String word = tuple.getString(0).toLowerCase();
		if (!stopWords.contains(word) && !(word.equals("obama") )) {
			//System.out.print(word);
			Integer count = counts.get(word);
			if (count == null)
				count = 0;
			count++;
			counts.put(word, count);
			collector.emit(new Values(word, count));
		}

    }

	@Override
	public void cleanup()
	{
		Iterator iter = counts.entrySet().iterator();
		Set<Map.Entry> new_pairs;
		TreeSet<Integer> curr_counts = new TreeSet<Integer>();
		Integer smallest_val;
		String smallest_string = "";
			
		while (iter.hasNext()) {
			smallest_string = "";
			Map.Entry pairs = (Map.Entry)iter.next();
			if (sortedCounts.size() >= 10) {

				smallest_val = curr_counts.first();
				Iterator pair_iter = sortedCounts.entrySet().iterator();
				while (pair_iter.hasNext()) {
					Map.Entry current_pair = (Map.Entry)pair_iter.next();
					Integer current_val = (Integer)current_pair.getValue();
					if (current_val.compareTo(smallest_val) <= 0) {
						smallest_string = (String)current_pair.getKey();
					}
				}
				sortedCounts.remove(smallest_string);
				curr_counts.remove(smallest_val);

				curr_counts.add((Integer)pairs.getValue());
				sortedCounts.put((String)pairs.getKey(), (Integer)pairs.getValue());
			} else {
				curr_counts.add((Integer)pairs.getValue());
				sortedCounts.put((String)pairs.getKey(), (Integer)pairs.getValue());
			}
			
		}
		Iterator pair_iter = sortedCounts.entrySet().iterator();
		while (pair_iter.hasNext()) {
			Map.Entry current_pair = (Map.Entry)pair_iter.next();
			System.out.println("Final Count [" + (String)current_pair.getKey() + " " + (Integer)current_pair.getValue());	
		}
		//System.out.println("done!");
		// ------------------------  Task 3 ---------------------------------------
		//
		//
		//	This function gets called when the Stream processing finishes.
		//	MODIFY this function to print the most frequent words that co-occur 
		//	with Obama [The TwitterSimpleSpout already gives you Tweets that contain
		//  the word obama].
		//
		//	Since multiple threads will be doing the same cleanup operation, writing the
		//	output to a file might not work as desired. One way to do this would be
		//  print the output (using System.out.println) and do a grep/awk/sed on that.
		//  For a simple example see inside the runStorm.sh.
		//
		//--------------------------------------------------------------------------
		

	}

    @Override
    public void declareOutputFields(OutputFieldsDeclarer declarer) {
      declarer.declare(new Fields("word", "count"));
    }
  }

  public static void main(String[] args) throws Exception {

    TopologyBuilder builder = new TopologyBuilder();
    stopWords = new HashSet<String>();

    /* Get the words that you do not count for */
    try {

    	BufferedReader reader = new BufferedReader(new FileReader("/home/terrapin/datascience-fall14/lab8/Stopwords.txt"));
    	String currentWord;
    	while ( (currentWord = reader.readLine()) != null) {
    		stopWords.add(currentWord);
    	}
    } catch (IOException e) {
    	// something to be done here
    }

	// ---------------------------- Task 1 -------------------------------------
	//
	//		You need to use TwitterSampleSpout() for the assignemt. But, it won't work
	//		unless you set up the access token correctly in the TwitterSampleSpout.java
	//
	//		RandomSentenceSpout() simply spits out a random sentence. 
	//
	//--------------------------------------------------------------------------

	// Setting up a spout
	builder.setSpout("spout", new RandomSentenceSpout(), 3);
	//builder.setSpout("spout", new TwitterSampleSpout(), 3);

	// Setting up bolts
    builder.setBolt("split", new SplitSentence(), 3).shuffleGrouping("spout");
    builder.setBolt("count", new WordCount(), 3).fieldsGrouping("split", new Fields("word"));

    Config conf = new Config();
    conf.setDebug(true);


    if (args != null && args.length > 0) {
      conf.setNumWorkers(3);

      StormSubmitter.submitTopologyWithProgressBar(args[0], conf, builder.createTopology());
    }
    else {
      conf.setMaxTaskParallelism(3);

      LocalCluster cluster = new LocalCluster();
      cluster.submitTopology("word-count", conf, builder.createTopology());

	  // --------------------------- Task 4 ---------------------------------
	  //
	  //	The sleep time simply indicates for how long you want to keep your
	  //	system up and running. 10000 (miliseconds) here means 10 seconds.
	  // 	
	  //
	  // ----------------------------------------------------------------------

      // wait for 10 minutes until the data gathering is complete
      Thread.sleep(600000);

      cluster.shutdown(); // blot "cleanup" function is called when cluster is shutdown (only works in local mode)
    
    }
  }
}
