define(function(){
      var mutations_forgenes_charts = {
        mutations_forgenes_charts: function(entrezGeneId, GeneName){
              samplelistid = "gbm_tcga_all";        
              molecularprofileid = "gbm_tcga_mutations";   

              //entrezGeneId = entrezGeneId;
              GeneName = GeneName;
                
              downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/mutations?sampleListId="+samplelistid+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
              
              promise = makePromise(downloadurl);

              promise.then(function(result){        
                  var JSONData = $.getJSON(downloadurl, function(data){
                    var items = data;
                    
                    var sampleID = [];
                    var mutationtype = [];
                    var entrezGeneId = [];

                    for (var i = 0; i < items.length; i++) {
                            item = items[i]; 
                            sampleID[i] = item['sampleId'];
                            mutationtype[i] = item['mutationType'];
                            entrezGeneId[i] = item['entrezGeneId'];                    
                    }      

                    xvalue = mutationtype;            
                    yvalue = entrezGeneId;            

                    hovertext = "EntrezGeneId: "+ entrezGeneId+" Grouped Gene Mutations, entrezGeneID wise for GBM";

                    var data = [{
                        type: 'bar',
                        x: xvalue,
                        y: yvalue,                
                        transforms: [{
                            type: 'groupby',
                            groups: xvalue
                        }]
                    }]

                    var layout = {title: hovertext, barmode: 'overlay', bargap:0.25, bargroupgap:0.1, barnorm:'percent',
                        xaxis: {
                            title: {
                              text: 'Mutation Types of GBM',
                              font: {
                                family: 'Courier New, monospace',
                                size: 18,
                                color: '#7f7f7f'
                              }
                            },
                          },
                          yaxis: {
                            title: {
                              text: 'Entrez GeneID',
                              font: {
                                family: 'Courier New, monospace',
                                size: 18,
                                color: '#7f7f7f'
                              }
                            }
                          }};
                    
                    Plotly.newPlot("plotly_div", data, layout);
                  }) //end of JSONData
              }) //end of promise
         }//end of named/internal function
          //}
      } //end of var
    return mutations_forgenes_charts
  }//end of function
);