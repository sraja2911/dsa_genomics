define(function(){
	var mrna_for_multigenes_lgg_gbm_grouped = {
		mrna_for_multigenes_lgg_gbm_grouped:function(entrezGeneId, GeneName){
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
		}//end of named function
	}//end of var
  return mrna_for_multigenes_lgg_gbm_grouped;
}); //end of define