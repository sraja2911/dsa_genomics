define(function(){
	var mrna_for_multigenes_gbm_grouped = {
		mrna_for_multigenes_gbm_grouped : function(entrezGeneId, GeneName){
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
		}//end of named/internal function
	}//end of var
	return mrna_for_multigenes_gbm_grouped;
}); //end of define