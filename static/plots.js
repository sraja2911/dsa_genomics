export function dis_cna_forgenes_charts(entrezGeneId, GeneName){
    samplelistid = "gbm_tcga_all";        
    molecularprofileid = "gbm_tcga_gistic";
    entrezGeneId = entrezGeneId;
    GeneName = GeneName;
      
    downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/discrete-copy-number?sampleListId="+samplelistid+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
    
    promise = makePromise(downloadurl);

    promise.then(function(result){        
        var JSONData = $.getJSON(downloadurl, function(data){
        var items = data;
        
        var alterationsvalue = [];
        var sampleID = [];
        var mutationtype = [];
        //var entrezGeneId = [];

        for (var i = 0; i < items.length; i++) {
                item = items[i]; 
                sampleID[i] = item['sampleId'];
                alterationsvalue[i] = item['alteration'];
                entrezGeneId[i] = item['entrezGeneId'];                    
               }      

        yvalue = alterationsvalue;            
        xvalue = entrezGeneId;            
        //yvalue = sampleID;            

        hovertext = "GBM-Copynumber_alterations, entrezGeneID-wise (GISTIC study)";

        var data = [{
            type: 'bar',
            x: xvalue,
            y: yvalue,                                
            transforms: [{
                type: 'groupby',
                groups: xvalue
            }]
        }]

        var layout = {
            title: hovertext,
            barmode: 'relative',
            bargap:0.25,
            bargroupgap:0.1,
            xaxis: {
                    title: {
                        text: 'Entrez GeneID'
                    },   
                    range: [10,77000]                                        
                    },    
            yaxis: {
                title: {
                    text: 'Genes CNA Values for GBM',
                    font: {
                            family: 'Courier New, monospace',
                            size: 18,
                            color: '#7f7f7f'
                          }
                        }
                    }                
        };
        
        Plotly.newPlot("plotly_div", data, layout);
        }) //end of JSONdata
    }) // end of Promise
}

export function dis_cna_forgenes_charts_grouped(entrezGeneId){
        samplelistid = "gbm_tcga_all";        
        molecularprofileid = "gbm_tcga_gistic";   

        //entrezGeneId = entrezGeneId;
        GeneName = GeneName;
          
        downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/discrete-copy-number?sampleListId="+samplelistid+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
        
        promise = makePromise(downloadurl);

        samplelistidlgg = "lgg_tcga_all";
        molecularprofileidlgg = "lgg_tcga_gistic"
        downloadlgg = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileidlgg+"/discrete-copy-number?sampleListId="+samplelistidlgg+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
        promiselgg = makePromise(downloadlgg);


        promise.then(function(result){        
          promiselgg.then(function(result){
            var JSONData = $.getJSON(downloadurl, function(data){
                var items = data;
                
                var alterationsvalue = [];
                var sampleID = [];            
                var entrezGeneId = [];

                for (var i = 0; i < items.length; i++) {
                        item = items[i]; 
                        sampleID[i] = item['sampleId'];
                        alterationsvalue[i] = item['alteration'];
                        entrezGeneId[i] = item['entrezGeneId'];                    
                       }      

                yvalue = alterationsvalue;            
                xvalue = entrezGeneId;   
                
                var JSONlgg = $.getJSON(downloadlgg, function(data){
                  var itemslgg = data;
                  var alterationsvaluelgg = [];
                  var sampleIDlgg = [];
                  var entrezGeneIdlgg = [];

                  for (var i = 0; i < itemslgg.length; i++) {
                          itemlgg = itemslgg[i]; 
                          sampleIDlgg[i] = itemlgg['sampleId'];
                          alterationsvaluelgg[i] = itemlgg['alteration'];
                          entrezGeneIdlgg[i] = itemlgg['entrezGeneId'];                    
                         }      

                  yvaluelgg = alterationsvaluelgg;            
                  xvaluelgg = entrezGeneIdlgg;                        

                  hovertext = "Putative copy-number alterations from GISTIC";

                  var trace1 = {
                    x: xvalue,
                    y: yvalue,
                    name: 'GBM', 
                    type: 'bar',              
                    transforms: [{
                          type: 'groupby',
                          groups: xvalue
                      }]
                  };

                  var trace2 = {
                    x: xvaluelgg,
                    y: yvaluelgg,
                    name: 'lgg',
                    type: 'bar',              
                    transforms: [{
                          type: 'groupby',
                          groups: xvaluelgg
                      }]
                  };

                  var data = [trace1, trace2];

                  var layout = {
                      title: hovertext,
                      barmode: 'group',
                      bargap:0.25,
                      bargroupgap:0.1,
                      barnorm:'percent',
                      xaxis: {
                          title: {
                              text: 'Entrez GeneID'
                          },
                      yaxis: {
                          title: {
                              text: 'Genes CNA Values',
                              font: {
                                      family: 'Courier New, monospace',
                                      size: 18,
                                      color: '#7f7f7f'
                                    }
                                  }
                              }
                          }
                  };

                  Plotly.newPlot('plotly_div', data, layout);
                })//end of JSONlgg
            })//end of JSONData
          }) //end of promiselgg
        })//end of promise
}

export function mutations_forpatients_charts(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId){
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
}

export function mutations_forgenes_charts(entrezGeneId, GeneName){
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
}

export function mutations_forgenes_charts_grouped(entrezGeneId, GeneName, sampleID){        
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
}

export function mrna_forgenes_charts(entrezGeneId, GeneName){

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
}

export function mrna_forpatients_charts(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId, GeneName){ 
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
}

export function dis_cna_forpatients_charts(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId){ 
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
//})
}

export function mrna_forgenes_charts_grouped(entrezGeneId, GeneName){
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

export function mRNA_bloodvsnonblood_charts(entrezGeneId, geneName){
        $$("slideDataview").filter(function(obj) {if(obj.meta.Blood =="Yes") return true;  } )
        $$("slideDataview").select();
        var blood_selected = $$("slideDataview").getSelectedItem(true);
        var blood_selected = webix.toArray(blood_selected);

        $$("slideDataview").filter(function(obj) {if(obj.meta.Blood =="No") return true;  } )
        $$("slideDataview").select();
        var nb_selected = $$("slideDataview").getSelectedItem(true);
        var nb_selected = webix.toArray(nb_selected);

        samplelistid = "gbm_tcga_all";        
        molecularprofileid = "gbm_tcga_pan_can_atlas_2018_rna_seq_v2_mrna";
        var entrezGeneId = entrezGeneId;
        var geneName = geneName;

        var bxvalue = []
        var byvalue = []
        var nbxvalue = []
        var nbyvalue = []

        blood_selected.each(function(obj){
            blood_name.push(obj.name);
            blood_patientID.push(obj.name.substring(0,12));
            blood_sampleID.push(obj.name.substring(0,15));            
        }) //end of blood slideRecords

        console.log(blood_selected)

        nb_selected.each(function(obj){
            nb_name.push(obj.name);
            nb_patientID.push(obj.name.substring(0,12));
            nb_sampleID.push(obj.name.substring(0,15));            
        })//end of non blood slideRecords  

        console.log(nb_selected)

        for (var i=0;i<entrezGeneId.length; i++){ 
            tempgbm = []
            temp2gbm = []            
            downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid +"/molecular-data?sampleListId="+samplelistid +"&entrezGeneId="+entrezGeneId[i]+"&projection=SUMMARY";           
            let xhrgbm = webix.ajax().sync().get(downloadurl);       
            let datagbm = xhrgbm.responseText;
            let itemsgbm = JSON.parse(datagbm);            

            // for Blood data
            for (var key in itemsgbm) {
                if (blood_sampleID == itemsgbm[key]['sampleId'])
                {
                    tempgbm.push(itemsgbm[key]['value']);
                    temp2gbm.push(itemsgbm[key]['entrezGeneId']);                
                }
            }
                byvalue.push(tempgbm);
                bxvalue.push(temp2gbm);
                console.log(byvalue);
                console.log(bxvalue);

            //for Non_blood data
            for (var key in itemslgg) {
                if (nb_sampleID == itemsgbm[key]['sampleId'])
                {
                    tempgbm.push(itemsgbm[key]['value']);
                    temp2gbm.push(itemsgbm[key]['entrezGeneId']);                
                }
            }

                nbyvalue.push(templgg);
                nbxvalue.push(temp2lgg);
                console.log(nbyvalue);
                console.log(nbxvalue);
        }

        hovertext = "Genes:"+geneName.toString()+ " -mRNA Expression for lgg vs gbm";
        let traces = [];             

        for (var i = 0; i<geneId_gbm.length; i++){
            traces.push({                  
                y: byvalue[i],
                type: 'box',
                name: 'Blood Slides',
                boxpoints: 'all',
                marker: {color: '#3D9970'}                
            });
        };

        for (var i=0; i<geneId_lgg.length; i++){         
            traces.push({                         
                y: nbyvalue[i],
                type: 'box',
                name: 'Non Blood Slides',
                boxpoints: 'all',
                marker: {color: '#FF851B'}                
            });         
        };

        let data = traces;
                    
        var layout = {            
            title: hovertext,
                xaxis: {
                    title: 'Gene Names:'+geneName.toString()                    
                },
                yaxis: {
                    title: 'mRNA expression values',
                    zeroline: true
                },
                boxmode: 'group'
        };   

        Plotly.newPlot("plotly_div", data, layout);            
}  

export function mRNAcharts_allBloodNonblood(blood_selected, nb_selected, entrezGeneId){
        samplelistid = "gbm_tcga_all";   //gbm_tcga_all, gbm_tcga      
        molecularprofileid = "gbm_tcga_mrna"; //gbm_tcga_mrna, gbm_tcga_rna_seq_v2_mrna
        entrezGeneId = entrezGeneId;
        console.log(entrezGeneId);

        var blood_selected = blood_selected;
        var nb_selected = nb_selected;       

        var blood_selected = webix.toArray(blood_selected);
        var nb_selected = webix.toArray(nb_selected);
        
        var nb_sampleID = [];
        var blood_name = [];
        var blood_patientID = [];
        var blood_sampleID = [];
        var nb_name = [];
        var nb_patientID = [];
        var nb_sampleID = [];

        blood_selected.each(function(obj){
            blood_name.push(obj.name);
            blood_patientID.push(obj.name.substring(0,12));
            blood_sampleID.push(obj.name.substring(0,15));            
        }) //end of blood slideRecords
        

        nb_selected.each(function(obj){
            nb_name.push(obj.name);
            nb_patientID.push(obj.name.substring(0,12));
            nb_sampleID.push(obj.name.substring(0,15));            
        })//end of non blood slideRecords   

        var bxvalue = []
        var byvalue = []
        var nbxvalue = []
        var nbyvalue = []               

        downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid+"/molecular-data?sampleListId="+samplelistid+"&entrezGeneId="+entrezGeneId+"&projection=SUMMARY";
        promise = makePromise(downloadurl);

        promise.then(function(result){        
            var JSONData = $.getJSON(downloadurl, function(data){
                var items = data;              
                var bld_mrnavalue = [];
                var bld_sampleID = [];
                var nbld_mrnavalue = [];
                var nbld_sampleID=[];
                
                for (var i = 0; i < items.length; i++) {                        
                        item = items[i];                        
                        for (var j = 0; j<blood_sampleID.length; j++){                                                            
                            if (blood_sampleID[j] == item['sampleId'] && item['entrezGeneId'] == entrezGeneId) 
                                {
                                    bld_sampleID[i] = item['sampleId'];
                                    bld_mrnavalue[i] = item['value'];
                                };                                                            
                        }                    
                }; // End of Blood for loop                     

                bxvalue = bld_sampleID;                
                byvalue = bld_mrnavalue;
                
                for (var i = 0; i < items.length; i++) {                        
                        item = items[i];
                        //console.log(item['sampleId']);                         
                        for (var j = 0; j<nb_sampleID.length; j++){
                            //console.log(nb_sampleID[j]);                            
                            if (nb_sampleID[j] == item['sampleId'] && item['entrezGeneId'] == entrezGeneId) 
                                {
                                    nbld_sampleID[i] = item['sampleId'];
                                    nbld_mrnavalue[i] = item['value'];
                                };                                                            
                        }                    
                }; // End of non Blood for loop
                
                nbxvalue = nbld_sampleID;                
                nbyvalue = nbld_mrnavalue;
                
                hovertext = "EntrezGeneId: "+ entrezGeneId + ": Blood vs Non-Blood mRNA Expression";
               
                var trace1 = { 
                    x: bxvalue,
                    y: byvalue,
                    name: 'Agilent microarray mRNA expression - GBM - Blood',
                    type: 'scatter',                    
                    mode: 'markers',
                    marker: {size:12}                
                };

                var trace2 = {
                    x: nbxvalue,
                    y: nbyvalue,
                    name: 'Agilent microarray mRNA expression - GBM - Non Blood',
                    type: 'scatter',                    
                    mode: 'markers',
                    marker: { size:12}                    
                };

                var data = [trace1, trace2];

                var layout = { title: hovertext};

                Plotly.newPlot("plotly_div", data, layout);                
            }) //End of Json data
        }) //End of Promise
}

export function mrna_for_multigenes_gbm_grouped(entrezGeneId, GeneName){
        samplelistid = "gbm_tcga_all";        
        molecularprofileid = "gbm_tcga_pan_can_atlas_2018_rna_seq_v2_mrna"; //gbm_tcga_mrna,gbm_tcga_rna_seq_v2_mrna   
        var entrezGeneId = entrezGeneId;
        var geneName = GeneName;        
        var mrnavalue = [];  
        var geneId = []; 

        for (var i=0;i<entrezGeneId.length; i++){ 
            temp = []
            temp2 = []             
            downloadurl = "http://www.cbioportal.org/api/molecular-profiles/" +molecularprofileid+"/molecular-data?sampleListId="+samplelistid+"&entrezGeneId="+entrezGeneId[i]+"&projection=SUMMARY";
            let xhr1 = webix.ajax().sync().get(downloadurl);       
            let data = xhr1.responseText;
            let items = JSON.parse(data);

            for (var key in items) {
                temp.push(items[key]['value']);
                temp2.push(items[key]['entrezGeneId']);                                
            }
            mrnavalue.push(temp);
            geneId.push(temp2);            
        }
    
        hovertext = "Genes:"+geneName.toString()+ "-mRNA Expression for GBM";

        let traces = [];        

        for (var i = 0; i<geneName.length; i++){
            traces.push({
                x: geneName[i],
                y: mrnavalue[i],
                type: 'box',
                boxpoints: 'all'
            })         
        }
            
        var layout = {title: hovertext,
            xaxis: {
                title: 'Gene Names'
            },
            yaxis: {
                title: 'mRNA expression values'
            }
        };   

        Plotly.newPlot("plotly_div", traces, layout);          
}

export function mrna_for_multigenes_lgg_gbm_grouped(entrezGeneId, GeneName){        
        samplelistid = "gbm_tcga_all";        
        molecularprofileid = "gbm_tcga_pan_can_atlas_2018_rna_seq_v2_mrna"; //gbm_tcga_mrna,gbm_tcga_rna_seq_v2_mrna          

        samplelistid1 = "lgg_tcga_all";        
        molecularprofileid1 = "lgg_tcga_pan_can_atlas_2018_rna_seq_v2_mrna"; //"lgg_tcga_pan_can_atlas_2018_rna_seq_v2_mrna";

        var entrezGeneId = entrezGeneId;
        var geneName = GeneName;        
        let mrnavalue_gbm = [];  
        let geneId_gbm = []; 
        let mrnavalue_lgg = [];
        let geneId_lgg = []

        for (var i=0;i<entrezGeneId.length; i++){ 
            tempgbm = []
            temp2gbm = []
            templgg=[]
            temp2lgg=[]            
            downloadurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid +"/molecular-data?sampleListId="+samplelistid +"&entrezGeneId="+entrezGeneId[i]+"&projection=SUMMARY";
            downloadlgg = "http://www.cbioportal.org/api/molecular-profiles/"+molecularprofileid1+"/molecular-data?sampleListId="+samplelistid1+"&entrezGeneId="+entrezGeneId[i]+"&projection=SUMMARY";
            let xhrgbm = webix.ajax().sync().get(downloadurl);       
            let datagbm = xhrgbm.responseText;
            let itemsgbm = JSON.parse(datagbm);

            let xhrlgg = webix.ajax().sync().get(downloadlgg);       
            let datalgg = xhrlgg.responseText;
            let itemslgg = JSON.parse(datalgg);

            // for gbm data
            for (var key in itemsgbm) {
                tempgbm.push(itemsgbm[key]['value']);
                temp2gbm.push(itemsgbm[key]['entrezGeneId']);                
            }
            mrnavalue_gbm.push(tempgbm);
            geneId_gbm.push(temp2gbm);

            //for lgg data
            for (var key in itemslgg) {
                templgg.push(itemslgg[key]['value']);
                temp2lgg.push(itemslgg[key]['entrezGeneId']);                
            }
            mrnavalue_lgg.push(templgg);
            geneId_lgg.push(temp2lgg);
        }

        hovertext = "Genes:"+geneName.toString()+ " -mRNA Expression for lgg vs gbm";
        let traces = [];             

        for (var i = 0; i<geneId_gbm.length; i++){
            traces.push({                  
                y: mrnavalue_gbm[i],
                type: 'box',
                name: 'GBM',
                boxpoints: 'all',
                marker: {color: '#3D9970'}                
            });
        };

        for (var i=0; i<geneId_lgg.length; i++){         
            traces.push({                         
                y: mrnavalue_lgg[i],
                type: 'box',
                name: 'lgg',
                boxpoints: 'all',
                marker: {color: '#FF851B'}                
            });         
        };

        let data = traces;
                    
        var layout = {            
            title: hovertext,
                xaxis: {
                    title: 'Gene Names:'+geneName.toString()                    
                },
                yaxis: {
                    title: 'mRNA expression values',
                    zeroline: true
                },
                boxmode: 'group'
        };   

        Plotly.newPlot("plotly_div", data, layout);            
}