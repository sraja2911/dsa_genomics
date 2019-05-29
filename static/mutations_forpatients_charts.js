define(function(){

  var mutations_forpatients_charts = {
        mutations_forpatients_charts: function(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId){
                samplelistid = "gbm_tcga_all";        
                molecularprofileid = "gbm_tcga_mutations";   

                entrezGeneId = entrezGeneId;
                selectedsampleID = sampleID;  
                //GeneName = GeneName;       

                downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/mutations?sampleListId="+samplelistid+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
                
                promise = makePromise(downloadurl);

                promise.then(function(result){
                    var JSONData = $.getJSON(downloadurl, function(data){
                      var items = data;

                      var mutationtype = []
                      var sampleID = []


                      for (var i = 0; i < items.length; i++) {
                          item = items[i]; 
                          for (var j = 0; j<selectedsampleID.length; j++){                                
                              if ( (item['sampleId'] == selectedsampleID[j]  && item['entrezGeneId'] == entrezGeneId)) 
                                  {
                                      sampleID[i] = item['sampleId'];                
                                      mutationtype[i] = item['mutationType'];                
                                  }
                          }                    
                      }     

                          xvalue = sampleID;                        
                          yvalue = mutationtype; 

                          hovertext = "EntrezGeneId: "+entrezGeneId + " Mutation Type of GBM";

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
                                      text: 'Mutation Types',
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
        } //end of named/internal function
  } //end of var
  return mutations_forpatients_charts;
}); //end of define