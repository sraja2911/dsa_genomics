define(function(){

	var mutations_forgenes_charts_grouped = {
			mutations_forgenes_charts_grouped : function(entrezGeneId, GeneName, sampleID){        
		        samplelistid = "gbm_tcga_pan_can_atlas_2018_sequenced";   //gbm_tcga_all     
		        molecularprofileid = "gbm_tcga_pan_can_atlas_2018_mutations";   //gbm_tcga_mutations

		        //entrezGeneId = entrezGeneId;
		        GeneName = GeneName;
		        
		        selectedsampleID = sampleID;  
		        downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/mutations?sampleListId="+samplelistid+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
		        
		        samplelistidlgg = "lgg_tcga_pan_can_atlas_2018_sequenced";
		        molecularprofileidlgg = "lgg_tcga_pan_can_atlas_2018_mutations";
		        downloadlgg = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileidlgg+"/mutations?sampleListId="+samplelistidlgg+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC"
		        
		        promise = makePromise(downloadurl);
		        promiselgg = makePromise(downloadlgg);

		        promise.then(function(result){        
		          promiselgg.then(function(result){

		            var JSONData = $.getJSON(downloadurl, function(data){
		              var items = data;
		              
		              var sampleID = [];
		              var mutationtype = [];
		              var entrezGeneId = [];
		              var fisValue = [];

		              for (var i = 0; i < items.length; i++) {
		                      item = items[i]; 
		                      //if ((item['mutationType'] == 'Missense_Mutation') || (item['mutationType'] == 'In_Frame_Ins') || (item['mutationType'] == 'NonStop_Mutation') || (item['mutationType'] == 'Translation_Start_Site') )
		                      if ((item['mutationType'] == 'Missense_Mutation'))
		                      {
		                          console.log('gbm')
		                          sampleID[i] = item['sampleId'];
		                          mutationtype[i] = item['mutationType'];
		                          entrezGeneId[i] = item['entrezGeneId'];
		                          fisValue[i]=item['fisValue'];                   
		                      }                     
		              }      

		              yvalue = mutationtype;            
		              //yvalue = entrezGeneId;            
		              xvalue = fisValue;            

		              var JSONlgg = $.getJSON(downloadlgg, function(data){
		                var itemslgg = data;
		                
		                var sampleIDlgg = [];
		                var mutationtypelgg = [];
		                var entrezGeneIdlgg = [];
		                var fisValuelgg=[]

		                for (var i = 0; i < itemslgg.length; i++) {
		                        itemlgg = itemslgg[i]; 
		                        //if ((itemlgg['mutationType'] == 'Missense_Mutation') || (itemlgg['mutationType'] == 'In_Frame_Ins') || (itemlgg['mutationType'] == 'NonStop_Mutation') || (itemlgg['mutationType'] == 'Translation_Start_Site') )
		                        if ((itemlgg['mutationType'] == 'Missense_Mutation'))
		                        {
		                            console.log ('lgg');
		                            sampleIDlgg[i] = itemlgg['sampleId'];
		                            mutationtypelgg[i] = itemlgg['mutationType'];
		                            entrezGeneIdlgg[i] = itemlgg['entrezGeneId'];
		                            fisValuelgg[i]=itemlgg['fisValue'];                   
		                        }                                      
		                }      

		                yvaluelgg = mutationtypelgg;            
		                //yvaluelgg = entrezGeneIdlgg;
		                xvaluelgg = fisValuelgg;   

		                hovertext = "Mis_sense_mutation FIS (Amino Acid residue changes-Functional Impact Score), for GBM vs LGG";
		                
		                var trace1 = {
		                  x: xvalue,
		                  //y: yvalue,
		                  name: 'GBM',
		                  type: 'box',
		                  marker: {
		                        color: 'rgb(8,81,156)'
		                      },
		                      boxmean: 'sd'                                          
		                };

		                var trace2 = {
		                  x: xvaluelgg,
		                  //y: yvaluelgg,
		                  name: 'lgg',
		                  type: 'box',
		                  marker: {
		                        color: 'rgb(10,140,208)'
		                      },
		                      boxmean: 'sd'                               
		                };

		                //hovertext = GeneName + " Mutations";

		                var data = [trace1, trace2];

		                var layout = {
		                    title: hovertext,
		                    xaxis: {range:[0.1,2]},
		                    yaxis: {range:[0.1,2]}
		                };

		                Plotly.newPlot('plotly_div', data, layout);
		              }) //endof JSONlgg
		            }) //end of JSONData
		          })//end of promiselgg
		        })//end of promise
		} //end of named/internal function			

	} //end of var
})//end of define