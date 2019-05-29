define(function(){

    var dis_cna_forgenes_charts = {
        dis_cna_forgenes_charts: function(entrezGeneId, GeneName){
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
         } //end of named/internal functon   
    } //end of var
   return dis_cna_forgenes_charts; 
  } //end of function
);