define(function(){

    var mrna_forpatients_charts = {
        mrna_forpatients_charts: function(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId, GeneName){
              samplelistid = "gbm_tcga_all";        
              molecularprofileid = "gbm_tcga_mrna";   
              entrezGeneId = entrezGeneId;
              GeneName = GeneName;    
              selectedsampleID = sampleID;    
              var mrna_exp = []               

              downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/molecular-data?sampleListId="+samplelistid+"&entrezGeneId="+entrezGeneId+"&projection=SUMMARY";
              promise = makePromise(downloadurl);

              promise.then(function(result){        
                  var JSONData = $.getJSON(downloadurl, function(data){
                    var items = data;
                    
                    var mrnavalue = [];
                    var sampleID = [];
                    

                    for (var i = 0; i < items.length; i++) {
                            item = items[i]; 
                                for (var j = 0; j<selectedsampleID.length; j++){    
                                    //console.log(item['sampleId']);                        
                                    if ((selectedsampleID[j] == item['sampleId']) && item['entrezGeneId'] == entrezGeneId) 
                                        {
                                            sampleID[i] = item['sampleId'];
                                            mrnavalue[i] = item['value']; 
                                        }                           
                                }                    
                    }      

                    xvalue = sampleID;            
                    yvalue = mrnavalue; 

                    hovertext = "EntrezGeneId: "+entrezGeneId + " mRNA Expression for GBM";

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
                  })// endof JSONData
              }) //end of promise
        } //end of named/internal function
    } //end of var
    return mrna_forpatients_charts;
}); //end of define