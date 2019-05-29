define(function(){

	var mrna_forgenes_charts_grouped = {
		mrna_forgenes_charts_grouped : function(entrezGeneId){
			samplelistid = "gbm_tcga_all";        
	        molecularprofileid = "gbm_tcga_pan_can_atlas_2018_rna_seq_v2_mrna"; //gbm_tcga_mrna,gbm_tcga_rna_seq_v2_mrna   
	        entrezGeneId = entrezGeneId;
	        geneName = GeneName;        
	        var mrna_exp = []        

	        downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/molecular-data?sampleListId="+samplelistid+"&entrezGeneId="+entrezGeneId+"&projection=SUMMARY";
	        promise = makePromise(downloadurl);

	        samplelistid1 = "lgg_tcga_all";        
	        molecularprofileid1 = "lgg_tcga_pan_can_atlas_2018_rna_seq_v2_mrna"; //"lgg_tcga_pan_can_atlas_2018_rna_seq_v2_mrna";
	        downloadlgg = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid1+"/molecular-data?sampleListId="+samplelistid1+"&entrezGeneId="+entrezGeneId+"&projection=SUMMARY"
	        promiselgg = makePromise(downloadlgg)

	        promise.then(function(result){        

	          promiselgg.then(function(result){
	            var JSONData = $.getJSON(downloadurl, function(data){
	              var items = data;
	              
	              var mrnavalue = [];
	              var sampleID = [];

	              for (var i = 0; i < items.length; i++) {
	                      item = items[i]; 
	                      if (item['entrezGeneId'] == entrezGeneId){
	                          sampleID[i] = item['sampleId'];
	                          mrnavalue[i] = item['value']; 
	                      }               
	              }      

	              xvalue = sampleID;            
	              yvalue = mrnavalue;            

	              var JSONlgg = $.getJSON(downloadlgg, function(data){
	                var itemslgg = data;
	                
	                var mrnavaluelgg = [];
	                var sampleIDlgg = [];
	                var entrezGeneIdlgg = []

	                for (var i = 0; i < itemslgg.length; i++) {
	                        itemlgg = itemslgg[i]; 
	                        if(itemlgg['entrezGeneId'] == entrezGeneId){
	                            sampleIDlgg[i] = itemlgg['sampleId'];
	                            mrnavaluelgg[i] = itemlgg['value'];      
	                        }          
	                }      

	                xvaluelgg = sampleIDlgg;
	                yvaluelgg = mrnavaluelgg;

	                hovertext = geneName.toUpperCase() + ":GBM vs LGG-mRNA Exp";
	                                
	                var trace1 = { 
	                    y: mrnavalue,                
	                    name: 'GBM:'+ items.length,
	                    type: 'box',
	                    marker: {
	                        color: 'rgb(8,81,156)'
	                        //opacity: 0
	                      },
	                      boxpoints: 'all'                              
	                };

	                var trace2 = {
	                    y: mrnavaluelgg,                
	                    name: 'LGG:'+ itemslgg.length,
	                    type: 'box',
	                    marker: {
	                        color: 'rgb(10,140,208)'
	                        //opacity: 0
	                      },
	                      boxpoints: 'all'
	                };

	                var layout = {title: hovertext,
	                    xaxis: {
	                        title: 'Cancer types',
	                        tickangle: -45,                    
	                        zeroline: true
	                    },
	                    yaxis: {
	                        title: 'mRNA expression values',                    
	                        zeroline: true,
	                        tickangle: -45
	                    }
	                };


	                var data = [trace1, trace2]            

	                Plotly.newPlot("plotly_div", data, layout);
	              }) //endof JSONLgg 
	            }) //end of JSONdata
	         })
	        })
			}
	} //end of var
	return mrna_forgenes_charts_grouped;
}); //end of define