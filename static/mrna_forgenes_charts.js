define(function(){

		var mrna_forgenes_charts = {
				mrna_forgenes_charts: function(entrezGeneId, GeneName){
				    samplelistid = "gbm_tcga_all";        
			        molecularprofileid = "gbm_tcga_mrna";   
			        entrezGeneId = entrezGeneId;
			        GeneName = GeneName;        
			        var mrna_exp = []
			   
			        //mrna_exp = mrnaexp_data_for_gene(molecularprofileid, samplelistid, entrezGeneId); 

			        downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/molecular-data?sampleListId="+samplelistid+"&entrezGeneId="+entrezGeneId+"&projection=SUMMARY";
			        promise = makePromise(downloadurl);

			        promise.then(function(result){        
			            var JSONData = $.getJSON(downloadurl, function(data){
			              var items = data;
			              
			              var mrnavalue = [];
			              var sampleID = [];

			              for (var i = 0; i < items.length; i++) {
			                      item = items[i]; 
			                      sampleID[i] = item['sampleId'];
			                      mrnavalue[i] = item['value'];                
			              }      

			              xvalue = sampleID;            
			              yvalue = mrnavalue;

			              hovertext = GeneName + " mRNA Expression";

			              var data = [{
			                  type: 'bar',
			                  x: xvalue,
			                  y: yvalue,                
			                  transforms: [{
			                      type: 'sort',
			                      target: yvalue
			                  }]
			              }]

			              var layout = {
			                  title: hovertext,
			                  barmode: 'relative',
			                  bargap:0.25,
			                  bargroupgap:0.1,
			                  xaxis: {
			                      title: {
			                          text: 'SampleID'
			                      },
			                  yaxis: {
			                      title: {
			                          text: 'mRNA expression',
			                          font: {
			                                  family: 'Courier New, monospace',
			                                  size: 18,
			                                  color: '#7f7f7f'
			                                }
			                        }
			                  }
			                  }
			              };
			              
			              Plotly.newPlot("plotly_div", data, layout);
			            }) //end of JSONData
			        })//end of promise	
				}//end of named/internal function
		} //end of var
	return mrna_forgenes_charts;
});//end of define
