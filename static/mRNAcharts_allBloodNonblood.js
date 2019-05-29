define(function(){

	var mRNAcharts_allBloodNonblood = {
		mRNAcharts_allBloodNonblood : function(blood_selected, nb_selected, entrezGeneId){
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
		}//end of named function
	}//end of var
	return mRNAcharts_allBloodNonblood;
}); //end of define