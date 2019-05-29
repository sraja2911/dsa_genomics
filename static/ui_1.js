//Plot Modules are instantiated
define (function(require){
    mutations_forgenes_charts = require('./mutations_forgenes_charts');    
    mrna_forgenes_charts = require('./mrna_forgenes_charts');            
    dis_cna_forgenes_charts = require('./dis_cna_forgenes_charts');
    dis_cna_forgenes_charts_grouped = require('./dis_cna_forgenes_charts_grouped');
    mutations_forpatients_charts = require('./mutations_forpatients_charts');
    mutations_forgenes_charts_grouped = require('./mutations_forgenes_charts_grouped');
    mrna_forpatients_charts = require('./mrna_forpatients_charts');
    dis_cna_forpatients_charts = require('./dis_cna_forpatients_charts');
    mrna_forgenes_charts_grouped = require('./mrna_forgenes_charts_grouped');
    mRNA_bloodvsnonblood_charts = require('./mRNA_bloodvsnonblood_charts');
    mRNAcharts_allBloodNonblood = require('./mRNAcharts_allBloodNonblood');
    mrna_for_multigenes_gbm_grouped = require('./mrna_for_multigenes_gbm_grouped');
    mrna_for_multigenes_lgg_gbm_grouped = require('./mrna_for_multigenes_lgg_gbm_grouped');    
    console.log(mrna_for_multigenes_gbm_grouped);    
}); //end of plots modules defintion

//Gene Modules are instantiated
define (function(require){

}); //end of genes modules defintion

config = {}
//config.BASE_URL = "http://candygram.neurology.emory.edu:8080/api/v1"
config.BASE_URL = "http://digitalslidearchive.emory.edu:8080/girder_root/api/v1"

var rnd_selected = [];
var nb_selected = [];
var blood_selected = [];

thumbHeight = 200;

function closeWindow() {
    $$("my_win").hide();
}

var window = webix.ui({
    view: "window",
    id: "my_win",
    modal: true,
    head: "DSA - Slide Properties",
    position: "center",
    height: 350,
    width: 350,
    body: {
        rows: [
            { view: "button", value: "", click: closeWindow },
            { view: "template", id: "templateWin", template: "My box" }
        ]
    }
})

sliderTemplate = ""

webix.type(webix.ui.dataview, {
    name: "smallThumb",
    template: "<br>#slideAbbrev# <img src='" + config.BASE_URL + "/item/#_id#/tiles/thumbnail?width=128' >",
    width: 140,
    height: 140
});

webix.type(webix.ui.dataview, {
    name: "bigThumb",
    template: "<br>#name# <img src='" + config.BASE_URL + "/item/#_id#/tiles/thumbnail?width=256' >",
    width: 260,
    height: 360
});

var rajsFirstDataView = {
    view: "dataview",
    id: "slideDataview",
    //url: config.BASE_URL + "/item?folderId=5bd2222ee62914004e463a54&limit=50&sort=lowerName&sortdir=1&height=" + thumbHeight,
    //5ce30ef6e62914001ac04a8a, 5ae351e792ca9a0020d95e50
    url: config.BASE_URL + "/item?folderId=5ce30ef6e62914001ac04a8a&limit=300&sort=lowerName&sortdir=1&height=" + thumbHeight,     
    type: "smallThumb",    
    "select": true,
    "multiselect": true,
    "on": {
        'onAfterSelect': function(id) {
            var ar_selected = $$("slideDataview").getSelectedItem(true);
                if (ar_selected.length == 1) {
                    single_select(ar_selected[0])
                } else {                                                              
                    multi_select(ar_selected)                    
                }
             },
        'onItemClick': function(id) {
            console.log(this.getSelectedItem(id))  
        }
    },       
    scheme: {
        $init: function(obj) {
            obj['slideAbbrev'] = obj['name'].split(".")[0];
        }
    }
}

function makePromise(url) {    
    return new webix.promise(function(success, fail) {
        webix.ajax(url, function(text) {
            if (text) success(text);
            else fail(text.error)
        })
    })
}

function single_select(item) {
    id = item._id;    
    var blood = []
    var ink = []

    if ("meta" in item) {
        var tags = item.meta.tags;
        var Stain_Types = item.meta.Stain_Types;
        var Blood_Red_Percentage = item.meta.Blood_Red_Percentage;
        var White_Blood_Cell_Count = item.meta.White_Blood_Cell_Count;
        var Cancer_Grading = item.meta.Cancer_Grading;

        patientID = item.name.substring(0,12);
        sampleID = item.name.substring(0,15); 
       
        var blood = item.meta['blood'];
        var ink = item.meta['Ink'];                      
                        
        $("#maindialog").dialog({
            autoOpen: false,
            buttons: {
                clinical_Data_4_patient: function() {
                    clinical_Data_4_patient(patientID);                    
                    $(this).dialog("close");
                },
                clinical_Data_4_study: function() {
                    clinical_Data_4_study(studyID);                    
                    $(this).dialog("close");
                },
                clinical_Data_4_sample_studyID: function() {
                    clinical_Data_4_sample_studyID(studyID);                    
                    $(this).dialog("close");
                },
                clinical_Events: function() {
                    clinical_Events(patientID);
                    $(this).dialog("close");
                },
                copy_number_segments: function() {
                    copy_number_segments(sampleID);                    
                    $(this).dialog("close");
                },
                molecular_data:function(){
                    molecular_data();
                    $(this).dialog("close");
                },
                all_patients_in_study:function(){
                    all_patients_in_study();
                    $(this).dialog("close");
                },                
                patient_in_study:function(){
                    patient_in_study(patientID);
                    $(this).dialog("close");
                },
                cBio_SamplesList: function() {
                    cBio_SamplesList();                    
                    $(this).dialog("close");
                },
                sampleList_in_sampleId: function() {
                    sampleList_in_sampleId();                    
                    $(this).dialog("close");
                },
                all_sampleIDs_in_samplelist: function() {
                    all_sampleIDs_in_samplelist();                    
                    $(this).dialog("close");
                },                
                samplelist_in_study: function() {
                    samplelist_in_study();                    
                    $(this).dialog("close");
                },
                allcaselists_in_study: function(){
                    allcaselists_in_study();                    
                    $(this).dialog("close");
                },
                allsamples_patient_in_study: function() {
                    allsamples_patient_in_study(patientID);                    
                    $(this).dialog("close");
                },
                all_samples_in_study: function() {
                    all_samples_in_study();                    
                    $(this).dialog("close");
                },
                sample_in_study: function() {
                    sample_in_study(patientID);                    
                    $(this).dialog("close");
                },                                 
                mutated_genes_in_study: function() {
                    mutated_genes_in_study();                    
                    $(this).dialog("close");
                },
                copynumberregions_in_study: function() {
                    copynumberregions_in_study();                    
                    $(this).dialog("close");
                },                
                all_available_studies: function() {
                    all_available_studies();                    
                    $(this).dialog("close");
                },
                single_study: function() {
                    single_study();                    
                    $(this).dialog("close");
                },
                tags_of_study: function() {
                    tags_of_study();                    
                    $(this).dialog("close");
                },  
                generic_cBioportal: function() {
                    generic_cBioportal();
                    $(this).dialog("close");
                }
            },
            width: "600px"
        });
    }
    $$("sliderdata").define("template", sliderTemplate);
    $$("sliderdata").parse(item);
    $$("sliderdata").refresh();    
}

var layout = {
    title: 'Digital Slides Plot, Digital Slide Archive Platform, Emory University',
    xaxis: {
        title: 'Slide Name',
        titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
        }
    },
    height: 600,
    width: 600,
    showlegend: true,
    yaxis: {
        title: 'Slide Values',
        titlefont: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
        }
    }
};

slideText =""

function multi_select(ar_selected) {
    var slideRecords = webix.toArray(ar_selected);
    $("#maindialog").dialog("close");    
    data = []
    var update = []
    var name = []
    var patientID = []
    var geneID
    var sampleID = []        
    var blood = [];    
    var nb_selection = []
    slideRecords.each(function(obj) {        
        name.push(obj.name);
        patientID.push(obj.name.substring(0,12));        
        sampleID.push(obj.name.substring(0,15));        

        blood.push(obj.meta['blood']);        
        samplelistid = "gbm_tcga_all";        
        molecularprofileid = "gbm_tcga_mrna"; 
        entrezGeneId = $$("gene_options").getValue();       
    } )//end of slideRecords

   
    $("#genedialog").dialog({
        autoopen: true,
        wait:300,
        buttons: {
            mutations_forpatients_charts: function(){
                var genes = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
                for (j=0;j<genes.length; j++){
                    geneName=genes.split(/[\s,]+/);            
                }
                for(k=0;k<geneName.length;k++){
                    entrezGeneId[k] = genename2geneid(geneName[k].toString().toUpperCase());    
                }                
                mutations_forpatients_charts.mutations_forpatients_charts(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId);
                $(this).dialog("close");                    
            },
            mrna_expressions_forpatients_charts:function(){
                var genes = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
                for (j=0;j<genes.length; j++){
                    geneName=genes.split(/[\s,]+/);            
                }
                for(k=0;k<geneName.length;k++){
                    entrezGeneId[k] = genename2geneid(geneName[k].toString().toUpperCase());    
                }
                mrna_forpatients_charts.mrna_forpatients_charts(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId)
                $(this).dialog("close");                    
            },
            cna_forpatients_charts: function(){
                var genes = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
                for (j=0;j<genes.length; j++){
                    geneName=genes.split(/[\s,]+/);            
                }
                for(k=0;k<geneName.length;k++){
                    entrezGeneId[k] = genename2geneid(geneName[k].toString().toUpperCase());    
                }
                dis_cna_forpatients_charts.dis_cna_forpatients_charts(samplelistid, molecularprofileid, patientID, sampleID, entrezGeneId)        
                $(this).dialog("close");                    
            }
        },
        width: "600px"
    })
}


slideDataDT = {
                view: "datatable",
                autoConfig: true,
                css: "checkbox_style",
                id: "slidelist",
                editable: true,
                checkboxRefresh: true, 
                spans:true,
                select:"row",
                multiselect: true,
                scrollX:false,                                               
                url : config.BASE_URL + "/item?folderId=5ae351e792ca9a0020d95e50&limit=200&sort=lowerName&sortdir=1&height=" + thumbHeight,                
            };

var dataViewControls = {
    cols: [{
            view: "button",
            id: "btnBloodySlides",
            label: "Bloody Slides",           
            click: function(id) {                
                //$$("slideDataview").filter( function(obj) { if(obj.meta.tags.Blood =="Yes") return true;  });
                $$("slideDataview").filter( function(obj) { if(obj.meta.blood =="Yes") return true;  });
                var blood_selected = $$("slideDataview").getSelectedItem(true);

            }
        },
        {
            view: "button",
            id: "btnNonBloodySlides",
            label: "Non Bloody Slides",            
            click: function(id) {            
                $$("slideDataview").filter( function(obj) { if(obj.meta.blood =="No") return true;  } );
                var nb_selected = $$("slideDataview").getSelectedItem(true);           
            }          
        },
        {
            view: "button",
            id: "btnRandomSlides",
            label: "Random Slides",
            click: function(id) {                      
                $$("slideDataview").filter( function(obj) { if(obj.meta.blood =="Not Sure") return true;});
                var rnd_selected = $$("slideDataview").getSelectedItem(true);                          
            }           
        }        
    ]
}

function genename2geneid(genename){    
        var genename = genename;        
        genename_dload = "https://webservice.bridgedb.org/Human/xrefs/H/"+genename+"?dataSource=L";    
        var xhr = webix.ajax().sync().get(genename_dload);  
        var entrezGeneId = xhr.responseText.split('\t')[0];
    return entrezGeneId;                      
}

webix.ready(function() {
        pt1URL = "http://www.cbioportal.org/api/studies/gbm_tcga/patients/TCGA-02-0006/clinical-data?projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC"

        pt2URL = "http://www.cbioportal.org/api/studies/lgg_ucsf_2014/patients/P24/clinical-events?projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC"

        explistDT = {
                        view: "datatable",
                        autoConfig: true,
                        css: "checkbox_style",
                        id: "explist",
                        editable: true,
                        checkboxRefresh: true, 
                        spans:true,
                        select:"cell",
                        scrollX:false,               
                        url: ""                
                    };

        explist = {
                    gravity: 5,
                    rows: [ 

                            {
                                cols: [
                                        {view:"button", label:"EmptyGrid", click:function(){$$("explist").clearAll()}},
                                        {view:"button", label:"Available GenePanels for study", click:function(){
                                            $$("explist").clearAll()
                                            $$("explist").config.columns ={}
                                            $$("explist").refreshColumns();                                    
                                            genepanelurl = "http://www.cbioportal.org/api/gene-panels?projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
                                            $$("explist").load(genepanelurl);
                                        }},
                                        {view:"button", label:"Specific genepaneldata", click:function(){

                                            function show_geneId(obj, common, value, colId, index){ 
                                                return obj.genes[index].entrezGeneId      
                                            }
                                            function show_geneSymbol(obj, common, value, colId, index){ 
                                                return obj.genes[index].hugoGeneSymbol      
                                            }                                      
                                            $$("explist").clearAll();  
                                            $$("explist").config.columns=[
                                                {id: "Description", map:"#description#"},
                                                {id: "GeneId", isGroupItem: true, header:[{"text":"genes", colspan:"2"},{"text":"entrezGeneId"}], template:show_geneId},
                                                {id: "GeneSymbol", isGroupItem: true, header:[null,{"text":"GeneSymbol"}], template:show_geneSymbol},
                                                {id: "PanelId", map:"#genePanelId#"}                                        
                                            ];                                                                        
                                            $$("explist").refreshColumns();
                                            try{
                                                var cancerstudyID = prompt("Please enter Gene PanelID ", "IMPACT341")

                                                if (cancerstudyID == null || cancerstudyID == "") {
                                                    throw new Error("User cancelled the prompt.");
                                                }else {
                                                    cancerstudyID = cancerstudyID;
                                                }
                                            }
                                            catch(e){
                                                alert(e.message);
                                            }
                                            genepanelidurl = "http://www.cbioportal.org/api/gene-panels/"+cancerstudyID
                                            console.log(genepanelidurl)
                                            $$("explist").load(genepanelidurl);                                    
                                        }},
                                        {view:"button", label:"MutationData for CancerStudy", click:function(){
                                        //Add a clearall if you don't want it to append to the current list..
                                            $$("explist").clearAll();
                                            $$("explist").config.columns ={}
                                            $$("explist").refreshColumns();

                                            try{
                                                var molecularProfileId = prompt("Please enter molecular profilesID ", "acc_tcga_mutations")

                                                if (molecularProfileId == null || molecularProfileId == "") {
                                                    throw new Error("User cancelled the prompt.");            
                                                }else {
                                                    molecularProfileId = molecularProfileId;
                                                }
                                            }
                                            catch(e){
                                                alert(e.message);
                                            }

                                            try{
                                                var cancerstudyID = prompt("Please enter Cancer Study ID for the mutations profiles", "acc_tcga_all")

                                                if (cancerstudyID == null || cancerstudyID == "") {
                                                    throw new Error("User cancelled the prompt.");            
                                                }else {
                                                    cancerstudyID = cancerstudyID;
                                                }    
                                            }
                                            catch(e){
                                                alert(e.message);
                                            }
                                            mutationurl = "http://www.cbioportal.org/api/molecular-profiles/"+molecularProfileId+"/mutations?sampleListId="+cancerstudyID+"&projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC";
                                            $$("explist").load(mutationurl);
                                        }},
                                        {view:"button", label:"CopyNumber Regions", click:function(){                                    
                                            $$("explist").clearAll();
                                            $$("explist").config.columns ={}
                                            $$("explist").refreshColumns();                                    
                                            try{
                                                var cancerstudyID = prompt("Please enter Cancer StudyID ", "gbm_tcga")

                                                if (cancerstudyID == null || cancerstudyID == "") {
                                                    throw new Error("User cancelled the prompt.");
                                                }else {
                                                    cancerstudyID = cancerstudyID;
                                                }
                                            }
                                            catch(e){
                                                alert(e.message);
                                            }
                                            CNVurl = "http://www.cbioportal.org/api/studies/"+cancerstudyID+"/significant-copy-number-regions?projection=SUMMARY&pageSize=10000000&pageNumber=0&direction=ASC"
                                            console.log(CNVurl);
                                            $$("explist").load(CNVurl);
                                        }},
                                        {view:"button", label:"CopyNumberSegments-Patient", click:function(){
                                            $$("explist").clearAll();
                                            $$("explist").config.columns ={}
                                            $$("explist").refreshColumns();

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

                                            try{
                                                var sampleID = prompt("Please enter the Patient ID", "TCGA-02-0001-01")

                                                if (sampleID == null) {
                                                    throw new Error("User cancelled the prompt.");
                                                }else if (sampleID == "") {
                                                    sampleID = patientID
                                                }else{
                                                    sampleID = sampleID;
                                                }
                                            }
                                            catch(e){
                                                alert(e.message);
                                            }
                                            copynumberurl = "http://www.cbioportal.org/api/studies/"+studyID+"/samples/"+sampleID+"/copy-number-segments?projection=SUMMARY&pageSize=20000&pageNumber=0&direction=ASC";
                                            $$("explist").load(copynumberurl);
                                        }},
                            ]},
                            explistDT
                          ]
    }

    webix.ui({
            container: "main_layout",        
            rows: [{
                    "cols": [{
                            rows: [
                                { view: "template", template: "DV Controls", type: "header" },
                                 {   
                                   view:"combo", 
                                    id:"gene_options", 
                                    label:"Gene Name", 
                                    value:"5156", 
                                    options:[   
                                        {id:5156, value:"PDGFRA"}, 
                                        {id:1956, value:"EGFR"}, 
                                        {id:5728, value:"PTEN"},
                                        {id:7157, value:"TP53"}        
                                    ]                                
                                 },
                                {   
                                    view:"combo", 
                                    id:"gene_functions", 
                                    label:"Genetic Functions", 
                                    value:"1", 
                                    options:[   
                                        {id:1, value:"mRNA Expression"}, 
                                        {id:2, value:"Mutations"},
                                        {id:3, value:"Discrete Copy Number Alterations"}        
                                    ] 
                                },
                                {   
                                    view:"combo", 
                                    id:"grp_cmp_functions", 
                                    label:"Group Comparisons Functions", 
                                    value:"1", 
                                    options:[   
                                        {id:1, value:"Mutations-lgg vs gbm"}, 
                                        {id:2, value:"mRNA Expression-lgg vs gbm"},
                                        {id:3, value:"Multi Genes-mRNA expression, GBM"},
                                        {id:4, value:"Multi Genes-mRNA expression, lgg vs GBM"},
                                        {id:5, value:"Discrete Copy Number Alterations-lgg vs gbm"}        
                                    ] 
                                },
                                // {   
                                //     view:"combo", 
                                //     id:"graphing_functions", 
                                //     label:"Various Graph Functions", 
                                //     value:"1", 
                                //     options:[   
                                //         {id:1, value:"bloody_nonbloody_geneexp_charts"}, 
                                //         {id:2, value:"mrna_combinedgeneexp_charts"}                                                                    
                                //     ] 
                                // },
                                {   
                                    view:"combo", 
                                    id:"qty_img_features", 
                                    label:"Quantitative Imaging Features", 
                                    value:"1", 
                                    options:[   
                                        {id:1, value:"Image RGB Color Histogram - KMeans Clustering"},
                                        {id:2, value:"Image Co-Occurrence Matrix"}
                                    ] 
                                },                               
                                dataViewControls,
                                rajsFirstDataView,
                                {
                                    view: "template",
                                    template: sliderTemplate,
                                    id: "sliderdata",
                                    gravity: 0.2
                                },                            
                            ]
                        },                    
                        { view: "resizer"},
                        { view: "template", content: "plotly_div" },
                        { view: "resizer"}                             
                    ]
                },
            ]
    })

    $$("gene_options").attachEvent("onAfterLoad", function(){
        this.select(1);
        genefunctions = $$("gene_functions").getInputNode().value 
        entrezGeneId = $$("gene_options").getValue();    
        GeneName = $$("gene_options").getInputNode().value
        mrna_forgenes_charts(entrezGeneId, GeneName);
    });

    $$("grp_cmp_functions").attachEvent("onAfterLoad", function(){    
        genefunctions = $$("gene_functions").getInputNode().value 
        entrezGeneId = $$("gene_options").getValue();    
        GeneName = $$("gene_options").getInputNode().value 
        grp_cmp_functions = $$("grp_cmp_functions").getInputNode().value
        mrna_forgenes_charts_grouped.mrna_forgenes_charts_grouped(entrezGeneId);
    });

    $$("gene_options").attachEvent("onChange", function(newv,oldv){
        genefunctions = $$("gene_functions").getInputNode().value 
        entrezGeneId = $$("gene_options").getValue();    
        GeneName = $$("gene_options").getInputNode().value  

        if (genefunctions == "mRNA Expression"){
            mrna_forgenes_charts(entrezGeneId, GeneName);            
        } else if(genefunctions == "Discrete Copy Number Alterations"){
            dis_cna_forgenes_charts(entrezGeneId, GeneName);
        } else { 
            mutations_forgenes_charts.mutations_forgenes_charts(entrezGeneId, GeneName);
        }
    });

    $$("grp_cmp_functions").attachEvent("onChange", function(newv,oldv){
        genefunctions = $$("gene_functions").getInputNode().value     
        GeneName = $$("gene_options").getInputNode().value 
        grp_cmp_functions = $$("grp_cmp_functions").getInputNode().value 

        if (grp_cmp_functions == "mRNA Expression-lgg vs gbm"){
            var geneName = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
            entrezGeneId = genename2geneid(geneName.toUpperCase());        
            mrna_forgenes_charts_grouped.mrna_forgenes_charts_grouped(entrezGeneId,geneName);            
        } else if(grp_cmp_functions == "Multi Genes-mRNA expression, GBM"){
            var geneName = [];
            var entrezGeneId = [];
            genes = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
            for (j=0;j<genes.length; j++){
                geneName=genes.split(/[\s,]+/);            
            }
            for(k=0;k<geneName.length;k++){
                entrezGeneId[k] = genename2geneid(geneName[k].toString().toUpperCase());    
            }               
            mrna_for_multigenes_gbm_grouped.mrna_for_multigenes_gbm_grouped(entrezGeneId,geneName);
        } else if (grp_cmp_functions == "Multi Genes-mRNA expression, lgg vs GBM"){
            var geneName = [];
            var entrezGeneId = [];
            genes = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
            for (j=0;j<genes.length; j++){
                geneName=genes.split(/[\s,]+/);            
            }
            for(k=0;k<geneName.length;k++){
                entrezGeneId[k] = genename2geneid(geneName[k].toString().toUpperCase());    
            }
            mrna_for_multigenes_lgg_gbm_grouped.mrna_for_multigenes_lgg_gbm_grouped(entrezGeneId,geneName);
        }else if(grp_cmp_functions == "Discrete Copy Number Alterations-lgg vs gbm"){ 
            var geneName = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
            entrezGeneId = genename2geneid(geneName.toUpperCase());       
            dis_cna_forgenes_charts_grouped.dis_cna_forgenes_charts_grouped(entrezGeneId, geneName);
        } else if(grp_cmp_functions == "Mutations-lgg vs gbm") { 
            var geneName = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
            entrezGeneId = genename2geneid(geneName.toUpperCase());
            mutations_forgenes_charts_grouped.mutations_forgenes_charts_grouped(entrezGeneId,geneName);
        }
    });

    $$("gene_functions").attachEvent("onChange", function(newv,oldv){        
        genefunctions = $$("gene_functions").getInputNode().value     
        geneName = $$("gene_options").getInputNode().value

        if (genefunctions == "mRNA Expression"){
            entrezGeneId = genename2geneid(geneName.toUpperCase());
            mrna_forgenes_charts.mrna_forgenes_charts(entrezGeneId, geneName);            
        } else if(genefunctions == "Discrete Copy Number Alterations"){
            entrezGeneId = genename2geneid(geneName.toUpperCase());
            dis_cna_forgenes_charts.dis_cna_forgenes_charts(entrezGeneId, geneName);
        } else { 
            entrezGeneId = genename2geneid(geneName.toUpperCase());
            mutations_forgenes_charts.mutations_forgenes_charts(entrezGeneId, geneName);
        }   
    });

    $$("graphing_functions").attachEvent("onChange", function(newv,oldv){        
        genefunctions = $$("gene_functions").getInputNode().value 
        entrezGeneId = $$("gene_options").getValue();    
        GeneName = $$("gene_options").getInputNode().value
        graphing_functions = $$("graphing_functions").getInputNode().value

        if (graphing_functions == "bloody_nonbloody_geneexp_charts"){
            console.log("in blood")        
           $("#genedialog").dialog({
                autoopen: true,
                wait:300,
                buttons: {
                        mutations_forpatients_charts: function(){
                        var geneName = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
                        entrezGeneId = genename2geneid(geneName.toUpperCase());                
                        mutations_forblood_charts(entrezGeneId, geneName);                    
                        $(this).dialog("close");                    
                    },
                    mrna_expressions_forpatients_charts:function(){
                        var geneName = [];
                        var entrezGeneId = [];
                        genes = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
                        for (j=0;j<genes.length; j++){
                            geneName=genes.split(/[\s,]+/);            
                        }
                        for(k=0;k<geneName.length;k++){
                            entrezGeneId[k] = genename2geneid(geneName[k].toString().toUpperCase());    
                        }
                        //mrna_for_multigenes_gbm_grouped(entrezGeneId,geneName);                      
                        mRNA_bloodvsnonblood_charts(entrezGeneId, geneName);                    
                    },
                    cna_forpatients_charts: function(){
                        var geneName = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
                        entrezGeneId = genename2geneid(geneName.toUpperCase());
                        dis_cna_forblood_charts(entrezGeneId,geneName);        
                        $(this).dialog("close");                    
                    }
                },
                width: "600px"
            })
        }else {        
                var geneName = prompt("Please enter valid Gene Name", "PTEN, EGFR,TP53, PDGFRA");
                entrezGeneId = genename2geneid(geneName.toUpperCase());

                $$("slideDataview").filter( function(obj) { if(obj.meta.blood =="Yes") return true;}) 
                $$("slideDataview").selectAll();
                var blood_selected = $$('slideDataview').getSelectedItem(true);        

                $$("slideDataview").filter( function(obj) { if(obj.meta.blood =="No") return true;}) 
                $$("slideDataview").selectAll();
                var nb_selected = $$('slideDataview').getSelectedItem(true);            
                mRNA_bloodvsnonblood_charts(entrezGeneId, geneName);
        }
    });

});

function generic_cBioportal(){
    $("#othercbiodialog").dialog({
            autoOpen: true,            
            buttons: {
                
                cancer_types_all: function() {
                    cancer_types_all();
                    $(this).dialog("close");
                },
                patients_all: function() {
                    patients_all();
                    $(this).dialog("close");
                },
                clinical_attributes:function(){
                    clinical_attributes();
                    $(this).dialog("close");
                },
                clinical_attributes_studyID:function(){
                    clinical_attributes_studyID();
                    $(this).dialog("close");
                },
                get_all_gene_panel:function(){
                    get_all_gene_panel();
                    $(this).dialog("close");
                },                
                molecular_profiles_all:function(){
                    molecular_profiles_all();
                    $(this).dialog("close");
                },
                molecular_profile_id:function(){
                    molecular_profiles_id();
                    $(this).dialog("close");
                },
                molecular_profiles_4_cancerstudyid:function(){
                    molecular_profiles_4_cancerstudyid()();
                    $(this).dialog("close");
                },
                molecular_mutations_profiles_4_cancerstudyid:function(){
                    molecular_mutations_profiles_4_cancerstudyid();
                    $(this).dialog("close");
                },
                discrete_copynumber_alterations: function() {
                    discrete_copynumber_alterations();                    
                    $(this).dialog("close");
                },
                gene_panelID: function() {
                    gene_panelID();                    
                    $(this).dialog("close");
                },
                main_CBioportal_Dialog: function() {
                    $("#maindialog").dialog("open"); 
                    $(this).dialog("close");                   
                }
            },
            width: "600px"             
        });    
 }        

 