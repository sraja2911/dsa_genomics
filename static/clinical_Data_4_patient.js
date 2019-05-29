define(function(){

	var clinical_Data_4_patient = {
		clinical_Data_4_patient : function(patientID){
			    filename = patientID +"_Clinical_Data"
			    try{
			        var studyID = prompt("Please enter the Cancer StudyID", "gbm_tcga")

			        if (studyID == null || studyID == "") {
			            throw new Error("User cancelled the prompt.");
			        }else {
			            studyID = studyID;
			        }
			        
			    }
			    catch(e){
			        alert(e.message);
			    }

			    downloadurl = "http://www.cbioportal.org/api/studies/"+studyID+"/patients/"+patientID+"/clinical-data?projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";

			    if (confirm('Do you want to download CSV data?')) {
			        $(document).ready(function() {
			        var JSONData = $.getJSON(downloadurl, function(data) {
			            var items = data;
			            //console.log(items);
			            const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
			            const header = Object.keys(items[0]);
			            let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/\\"/g, '""')));
			            csv.unshift(header.join(','));
			            csv = csv.join('\r\n');

			            //Download the file as CSV
			            var downloadLink = document.createElement("a");
			            var blob = new Blob(["\ufeff", csv]);
			            var url = URL.createObjectURL(blob);
			            downloadLink.href = url;

			            downloadLink.download = filename + ".csv";  //Name the file here
			            document.body.appendChild(downloadLink);
			            downloadLink.click();
			            document.body.removeChild(downloadLink);
			           })
			        })
			    }
			    else {
			            promise = makePromise(downloadurl);            
			            promise.then(function(result) {  
			                console.log("pre-dynamic columns")
			                console.log(result);
			                var jsdata = JSON.parse(result);
			                console.log(jsdata);
			                // Dynamically adding up columns to webix datatable
			                columnNames = Object.keys(jsdata.data[0]);

			                var columns = [];
			                for (var i=0; i<columnNames.length; i++)
			                  columns.push({jsdata:columnNames[i], title:columnNames[i]});
			          
			                console.log(columns);

			                this.dtable = new webix.ui({
			                                container: "box",
			                                view: "datatable",
			                                autoheight: true,
			                                autoConfig: true,
			                                css: "checkbox_style",
			                                id: "explist",
			                                editable: true,
			                                checkboxRefresh: true,
			                                columns: columns,
			                                data: jsdata,
			                                datatype:"jsarray"                
			                            });

			                $$("explist").clearAll();
			                $$("explist").parse(data);                
			                $$("explist").refresh();

			                /**$$("cbiodatatable").clearAll();
			                $$("cbiodatatable").parse(data);                
			                $$("cbiodatatable").refresh();**/
			                console.log("datatable displayed");                          
			                return
			            }, function(err) {
			            console.log(err);
			            });    
			    }
		}//end of named/internal function
	}//end of var
	return clinical_Data_4_patient;
}); //end of define