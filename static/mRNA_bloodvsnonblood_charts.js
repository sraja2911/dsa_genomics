define(function(){

	var mRNA_bloodvsnonblood_charts = {
		mRNA_bloodvsnonblood_charts : function(entrezGeneId, geneName){
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
		} //end of named/internal function
	}//end of var
	return mRNA_bloodvsnonblood_charts;
}); //end of define