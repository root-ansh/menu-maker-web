function onDomLoaded(event) {
    //tag-title:
    let tagllTitleOpt = document.getElementById('title_op'); 
    let tagLlTitleInp = document.getElementById('title_ip');

    let tagSpTitle = document.getElementById('sp_rest_name');
    let tagBtEditTitle = document.getElementById('bt_edit_title');


    let tagEtTitle = document.getElementById('et_rest_name');
    let tagBtSaveTitle = document.getElementById('bt_save_title');

    //tags-editor
    let tagLLEditorCat = document.getElementById('div_cat');
    let tagLLEditorItm = document.getElementById('div_item');
    let tagInpCat = document.getElementById('inp_cat_name');
    let tagInpItem =  document.getElementById('input_itemname')

    let tagLLInpHalf = document.getElementById('div_inp_half_p');
    let tagLLInpFull = document.getElementById('div_inp_full_p');


    let tagInputHalfP = document.getElementById('input_half_price');
    let tagInputfullP = document.getElementById('input_full_price');

    let tagBtSubmit  =document.getElementById('bt_submit');
    let tagPrintMenuPDF =document.getElementById('bt_print_menu');

    let tagSecTables = document.getElementById('section_table_group');
    





    //variables
    let titleName = "Your Resteraunt";
    let editorType = "val_category"; //accepted values = val_category //val_item
    let priceType ="val_single" //val_single , val_multi

    let menuObj = {}
    
    function addCategoryToMenu(catName){
        menuObj[catName]=[]
    }
    function addEntryToMenu(catName,entryArr){
        menuObj[catName].push(entryArr)
    }


    function removeCategory(catName){
        delete menuObj[catName]
    }

    function removeEntryFromMenu(catName,entry){
        //if removal of entrymakes the array size as 0, then remove the category too
        arr = menuObj[catName];
        let index = arr.indexOf(entry);
        if (index > -1) {
            arr.splice(index, 1);
        }

        if(arr.length ===0){
            removeCategory(catName);
        }

    }



    //ui functions


    
    

    //ui functions :title
    let toggleTitleEditBox = function (showEditBox) {
        if (showEditBox) {
            tagLlTitleInp.style.display = ""; //will restore the original display styling
            tagllTitleOpt.style.display = 'none';
        }
        else {
            tagLlTitleInp.style.display = 'none'; //will remove the original display styling and replace by 'none'
            tagllTitleOpt.style.display = "";
        }
    }
    let saveTitleName = function () {
        titleName = tagEtTitle.value;
        console.log("titleName=" + titleName);
    }
    let updateTitleUi = function () {
        tagSpTitle.innerText = titleName;
    }

    //ui functions :Tables
    function getMenuColumnTemplate(tb_title , entries){
        console.log("tb_title ="+tb_title);
        console.log("entries="+entries);
        
        
        let tb_entry_col_count=0
        let sizes = entries.map(item=>item.length)
        tb_entry_col_count = Math.max(...sizes)
        console.log(`#$#$#$#$#$#$#$#$#####sizes=${sizes}, entrycolcount= ${tb_entry_col_count}`);
        

        let comment = `<!-- ################################################################################################################# -->\n`
        let tpDivStart  = `<div class="column is-4"> \n\t <table class=" table is-bordered is-striped is-hoverable is-fullwidth">\n\t\t <thead>`
        let tptitle     = `\n\t\t\t <tr><th class="has-background-dark has-text-white" colspan="100">${tb_title}</th></tr>`
        let tpPriceRow = "";
        if(tb_entry_col_count===3){
            tpPriceRow =`\n\t\t\t <tr>\t<th>Name</th>\t<th>Half(₹)</th>\t<th>Full(₹) </th>\t</tr>`
        }else{
            tpPriceRow =`\n\t\t\t <tr>\t<th>Name</th>\t\t<th>Price(₹)</th>\t</tr>`
        }
        let tpMiddle = `\n\t\t</thead>\n\t\t<tbody>\n`

        let tpEntires = "";
        for(let et of entries){
            if(tb_entry_col_count===3){
                tpEntires+= `\n\t\t\t<tr>\t\t<td>${et[0]}</td>\t<td>${et[1]}</td>\t<td>${et[2]==undefined?0:et[2]}</td>\t\t</tr>`
            }
            else{
                tpEntires+= `\n\t\t\t<tr>\t\t<td>${et[0]}</td>\t<td>${et[1]}</td>\t\t</tr>\n`
            }
        }
        let tpEnd = `\n\t\t</tbody>\n\t</table>\n</div>\n`

        return comment+tpDivStart+tptitle+tpPriceRow+tpMiddle+tpEntires+tpEnd
        

    }
    function updateTableUI(){
        let colTemplate = ""

        for(let catName of Object.keys(menuObj)){
            let catEntries = menuObj[catName]

            console.log("catName=" +catName)
            console.log("catEntries=" +catEntries)
            

            colTemplate+= getMenuColumnTemplate(catName,catEntries)
        }

        tagSecTables.innerHTML =colTemplate;
    }

    let toggleEditorTypeAndUpdateGlobalVars = function (catValue) {
        // accesptable values = val_item ,val_category
        editorType = catValue;
        console.log(`update editorType to ${editorType}`);
        

        if (catValue === "val_item") {
            tagLLEditorItm.style.display = "";
            tagLLEditorCat.style.display = 'none';
        } else {
            tagLLEditorItm.style.display = "none";
            tagLLEditorCat.style.display = '';
        }
    }
    let toggleEditorPriceTypeRbAndInputTexts = function (priceVal) {
        //acceptable values: val_single val_multi
        priceType =priceVal
        console.log(`update priceType to ${priceType}`);

        tagLLInpHalf.style.display = (priceVal === "val_multi") ? "" : "none";

        tagInputHalfP.value = ""
        tagInputfullP.value = ""
    }

 

    let attachAndHandleCatButtonClick = function () {
        let btCatButtons = document.getElementsByName("tg_category");
        console.log("btCatButtons"+btCatButtons);
        
        for (let i = 0, max = btCatButtons.length; i < max; i++) {
            let currBtn = btCatButtons[i]
            
            currBtn.addEventListener('click',()=>{
                for(let btn of btCatButtons){
                    btn.classList.remove('is-success');
                }

                currBtn.classList.add('is-success')

            }
            )
        }
    }


    let addCategoryButtonsForItemWithOnClick = function () {
        let divCatGroup = document.getElementById("div_catgroup");
        divCatGroup.innerHTML = ""
        let categories_arr = Object.keys(menuObj)
        let html = "";

        for(let cat of categories_arr){
            html+=`<button class="button is-rounded " name="tg_category" value="val_${cat}"  >${cat}</button>\n `
        }

        divCatGroup.innerHTML = html;
    }

    let onSubmitClick = function(){
        console.log("=============onSubmitClick====================")
        let menuName= ""
        
        console.log(`editorType=${editorType}`)
        if(editorType === "val_category" ){
            menuName = tagInpCat.value
            console.log(`menuName =${menuName}`);
            
            console.log("=============onSubmitClick(2ndlast call)====================")

            addCategoryToMenu(menuName)
        }
        else{
            let btCatButtons = document.getElementsByName("tg_category");
            console.log(`btCatButtons=${btCatButtons}`);
            

            for(let btn of btCatButtons){
                if(btn.classList.contains('is-success')){
                    menuName = btn.textContent
                    break
                }
            }

            console.log(`menuName =${menuName}`);



            let entry = []
            entry.push(tagInpItem.value)

            console.log(`entry =${entry}`);

            console.log(`priceType=${priceType}`)
            
            

            if(priceType=="val_multi"){
                entry.push(tagInputHalfP.value)
                console.log(`entry =${entry}`);
                entry.push(tagInputfullP.value)
                console.log(`entry =${entry}`); 
            }
            else{
                //since we used full p for both
                entry.push(tagInputfullP.value)
                console.log(`entry =${entry}`);   
            }
            

            console.log("=============onSubmitClick(3rdlast call)====================")

            addEntryToMenu(menuName,entry);
        
        }

        console.log("=============onSubmitClick(2ndlast call)====================")


        updateTableUI();
        initOrResetUi();
    }

    function tempHideNonMenuUI(showOrHide){
        if(showOrHide === "hide"){
            document.getElementById("section_editor").style.display = "none";
            let btns = document.getElementsByTagName('button')
            for(let b of btns){
                b.style.display = "none"
            }
        }
        else{
            document.getElementById("section_editor").style.display = "";
            let btns = document.getElementsByTagName('button')
            for(let b of btns){
                b.style.display = ""
            }
        }
    }




    //init ui

    function initOrResetUi(){
        //title
        toggleTitleEditBox(false);
        updateTitleUi();

        //tables
        updateTableUI()

        //editor
        toggleEditorTypeAndUpdateGlobalVars("val_category");
        document.getElementById('rb_cat').checked = true;
        tagInpCat.value =""
        tagInpItem.value = ""


        addCategoryButtonsForItemWithOnClick();
    
    
        toggleEditorPriceTypeRbAndInputTexts("val_single");
        document.getElementById('rb_single').checked = true;
        tagInputHalfP.value =""
        tagInputfullP.value = ""

        attachListeners()

    
    }


    function attachListeners(){
        //addEventListenersToButtons
        tagBtEditTitle.addEventListener('click', (event) => toggleTitleEditBox(true))
        tagBtSaveTitle.addEventListener('click', (event) => { toggleTitleEditBox(false); saveTitleName(); updateTitleUi() })

        let rgEditorType = document.getElementsByName("rg_type");
        for (let i = 0, max = rgEditorType.length; i < max; i++) {
            rgEditorType[i].onclick = () => {

                toggleEditorTypeAndUpdateGlobalVars(rgEditorType[i].value);
            }
        }

        let rgPrice = document.getElementsByName("rg_price");
        for (let rbt of rgPrice) {
            rbt.onclick = () => { toggleEditorPriceTypeRbAndInputTexts(rbt.value) };
        }

        attachAndHandleCatButtonClick()

        tagBtSubmit.addEventListener('click',onSubmitClick )

        tagPrintMenuPDF.addEventListener('click',
        ()=>{
            tempHideNonMenuUI("hide");
            window.print();
            tempHideNonMenuUI("show");
            
            
        })
    }


    initOrResetUi()
    attachListeners()
    

    




    






}









document.addEventListener('DOMContentLoaded', onDomLoaded);



/* 
    on submit : 
    // 1. update table entries
    // 2. in global varibales, create 1 array:

    1. table_arr= [
        {
            tablle_cat = "",
            entries = []
        },

        {
            tablle_cat = "",
            entries = [
                {"kadhai paneer",90,180},
                {"kadhai paneer",90,180},
                {"kadhai paneer",90,180},
                {"kadhai paneer",90,180},
                {"kadhai paneer",90,180},
                {"kadhai paneer",90,180},
                
            ]
        },
    ]

    every submit entry adds the following details in the table:
//3 . reset ui

*/

