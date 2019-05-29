define(function(){
    var dis_cna_forgenes_charts_grouped = {
        dis_cna_forgenes_charts_grouped : function(entrezGeneId){
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

        }//end of named/internal function
    } //end of var
   return dis_cna_forgenes_charts_grouped;
 }//end of function
)