define(function(){

	var dis_cna_forpatients_charts = {
		dis_cna_forpatients_charts : function(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId){
				  samplelistid = "gbm_tcga_all";        
				  molecularprofileid = "gbm_tcga_gistic";   

				  entrezGeneId = entrezGeneId;
				  //GeneName = GeneName;
				  selectedsampleID = sampleID;    
				    
				  downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/discrete-copy-number?sampleListId="+samplelistid+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
				  
				  promise = makePromise(downloadurl);

				  promise.then(function(result){        
				      var JSONData = $.getJSON(downloadurl, function(data){
				        var items = data;
				        
				        var alterationsvalue = [];
				        var sampleID = [];
				        
				        for (var i = 0; i < items.length; i++) {
				                item = items[i]; 
				                    for (var j = 0; j<selectedsampleID.length; j++){                                
				                        if ((selectedsampleID[j] == item['sampleId']  && item['entrezGeneId'] == entrezGeneId )) 
				                        {
				                            sampleID[i] = item['sampleId'];
				                            alterationsvalue[i] = item['alteration']
				                        };                            
				                                                    
				                    }                    
				        }      

				        xvalue = sampleID;
				        yvalue = alterationsvalue;             

				        hovertext = "EntrezGeneId: "+entrezGeneId + " CNV value for GBM";

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
				                range: [0,10],
				                title: {
				                    text: 'SampleID'
				                    },
				                },                                                            
				            yaxis: {
				                range: [0,7],
				                title: {
				                    text: 'CNV values',
				                    font: {
				                            family: 'Courier New, monospace',
				                            size: 18,
				                            color: '#7f7f7f'
				                          }
				                  },
				              }
				            }

				            Plotly.newPlot("plotly_div", data, layout);
				      }); //JSONData            
				  })//endof promise
						}//end of named/internal function
	}//end of var
	return dis_cna_forpatients_charts;
}); //end of define