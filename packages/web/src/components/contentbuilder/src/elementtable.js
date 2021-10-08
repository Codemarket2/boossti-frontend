import { Dom, Util } from './util.js';

const dom = new Dom();

class Table {
    constructor(builder) {
        this.builder = builder;

        const util = new Util(builder);
        this.util = util;

        const builderStuff = util.builderStuff();
        this.builderStuff = builderStuff;

        let tableTool = builderStuff.querySelector('.is-table-tool');
        let tableModal;
        if(!tableTool){
            //
            //<div class="is-modal-bar is-draggable" style="background:#f9f9f9;"></div>
            let html = `
            <div class="is-tool is-table-tool">
                <button title="${util.out('Settings')}" style="width:40px;height:40px;background:none;"><svg class="is-icon-flex"><use xlink:href="#ion-ios-gear"></use></svg></button>
            </div>
            <div class="is-modal edittable" style="z-index:10002;">
                <div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;line-height:30px;height:30px;border:none;">
                    ${util.out('Table')}
                    <div class="is-modal-close" style="z-index:1;width:20px;height:20px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:20px;font-size:10px;color:#777;text-align:center;cursor:pointer;">&#10005;</div>
                </div>
                <div style="padding:0">
                    <div class="is-tabs clearfix" data-group="table">
                        <a title="${util.out('Style')}" id="tabTableGeneral" href="" data-content="divTableGeneral" class="active">${util.out('Style')}</a>
                        <a title="${util.out('Layout')}" id="tabTableLayout" href="" data-content="divTableLayout">${util.out('Layout')}</a>
                    </div>
                    <div id="divTableGeneral" class="is-tab-content" data-group="table" style="display:block">

                        <div style="display:flex;padding-bottom:12px">
                            <div style="padding-right:15px">
                                <div>${util.out('Background')}:</div>
                                <div>
                                    <button title="${util.out('Background Color')}" class="input-table-bgcolor is-btn-color"></button>
                                </div>
                            </div>
                            <div>
                                <div>${util.out('Text Color')}:</div>
                                <div>
                                    <button title="${util.out('Text Color')}" class="input-table-textcolor is-btn-color"></button>
                                </div>
                            </div>
                        </div>

                        <div style="padding-bottom:12px;">
                            <div>${util.out('Border Thickness')}:</div>
                            <div>
                                <select id="selCellBorderWidth" style="width:120px;"><option value="0">No Border</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select>  
                            </div>
                        </div>
                        
                        <div style="padding-bottom:12px;">
                            <div>${util.out('Border Color')}:</div>
                            <div>
                                <button title="${util.out('Border Color')}" class="input-table-bordercolor is-btn-color"></button>
                            </div>
                        </div>
                        
                        <div style="padding-bottom:12px;">
                            <div>${util.out('Apply To')}:</div>
                            <div>
                                <select id="selTableApplyTo" style="width:120px;">
                                    <option value="table">${util.out('Table')}</option>
                                    <option value="currentrow">${util.out('Current Row')}</option>
                                    <option value="currentcol">${util.out('Current Column')}</option>
                                    <option value="evenrows">${util.out('Even Rows')}</option>
                                    <option value="oddrows">${util.out('Odd Rows')}</option>  
                                    <option value="currentcell">${util.out('Current Cell')}</option>  
                                </select>
                            </div>
                        </div>

                    </div>

                    <div id="divTableLayout" class="is-tab-content" data-group="table">
                    
                        <div style="padding-bottom:12px;">
                            <div>${util.out('Insert Row')}:</div>
                            <div style="display:flex">
                                <button title="${util.out('Above')}" data-table-cmd="rowabove" title="${util.out('Above')}" style="width:90px;margin-right:5px"> ${util.out('Above')} </button>
                                <button title="${util.out('Below')}" data-table-cmd="rowbelow" title="${util.out('Below')}" style="width:90px;"> ${util.out('Below')} </button>
                            </div> 
                        </div>
                        
                        <div style="padding-bottom:12px;">
                            <div>${util.out('Insert Column')}:</div>
                            <div style="display:flex">
                                <button title="${util.out('Left')}" data-table-cmd="columnleft" title="${util.out('Left')}" style="width:90px;margin-right:5px"> ${util.out('Left')} </button> 
                                <button title="${util.out('Right')}" data-table-cmd="columnright" title="${util.out('Right')}" style="width:90px;"> ${util.out('Right')} </button> 
                            </div> 
                        </div>

                        <div style="padding-bottom:12px;">
                            <button title="${util.out('Delete Row')}" data-table-cmd="delrow" title="Delete Row" style="width:205px;margin-right:5px"> ${util.out('Delete Row')} </button> 
                        </div>

                        <div style="padding-bottom:12px;">    
                            <button title="${util.out('Delete Column')}" data-table-cmd="delcolumn" title="Delete Column" style="width:205px;"> ${util.out('Delete Column')} </button> 
                        </div>
                        
                        <div style="padding-bottom:12px;">    
                            <button title="${util.out('Merge Cell')}" data-table-cmd="mergecell" style="width:205px">${util.out('Merge Cell')}</button> 
                        </div>
                    </div>
                </div>
            </div>
            
            `;

            dom.appendHtml(builderStuff, html);

            tableTool = builderStuff.querySelector('.is-table-tool');
            tableModal = builderStuff.querySelector('.is-modal.edittable');


            let btn = tableTool.querySelector('button');
            dom.addEventListener(btn, 'click', () => { // old 10317
                if(dom.hasClass(tableModal, 'active')) {
                    dom.removeClass(tableModal, 'active');
                } else {
                    dom.addClass(tableModal, 'active');
                }
            });


            let btnClose = tableModal.querySelector('.is-modal-close');
            dom.addEventListener(btnClose, 'click', () => {
                dom.removeClass(tableModal, 'active');
            });


            btn = tableModal.querySelector('.input-table-bgcolor');
            btn.addEventListener('click', (e) => {

                this.builder.uo.saveForUndo();

                let elm = e.target;
                this.builder.colorPicker.open((color)=>{
                
                    if(!this.builder.activeTd) return;
                    
                    //Apply format
                    var applyto = tableModal.querySelector('#selTableApplyTo').value;
                    var oTable = this.builder.activeTable;
                    var oRow = this.builder.activeTd.parentNode;
                    var oCell = this.builder.activeTd;
                                                                            
                    if (applyto === 'currentcell') {
                        this.builder.activeTd.style.backgroundColor = color;
                    }
                    for (var i = 0; i < oTable.rows.length; i++) {                                
                        var oTR = oTable.rows[i];
                        for (var j = 0; j < oTR.cells.length; j++) {
                            var oTD = oTR.cells[j];
                                    
                            if (applyto === 'table' ||
                                (applyto === 'evenrows' && isEven(i + 1)) ||
                                (applyto === 'oddrows' && !isEven(i + 1)) ||
                                (applyto === 'currentrow' && oTR === this.builder.activeTd.parentNode ) ||
                                (applyto === 'currentcol' && j === getCellIndex(oTable, oRow, oCell))
                            ) {
                                oTD.style.backgroundColor = color;
                            }
                        }
                    }

                    elm.style.backgroundColor = color; // preview
                
                }, btn.style.backgroundColor);
            });

            btn = tableModal.querySelector('.input-table-textcolor');
            btn.addEventListener('click', (e) => {

                this.builder.uo.saveForUndo();

                let elm = e.target;
                this.builder.colorPicker.open((color)=>{
                
                    if(!this.builder.activeTd) return;

                    //Apply format
                    var applyto = tableModal.querySelector('#selTableApplyTo').value;
                    var oTable = this.builder.activeTable;
                    var oRow = this.builder.activeTd.parentNode;
                    var oCell = this.builder.activeTd;
                                                                            
                    if (applyto === 'currentcell') {
                        this.builder.activeTd.style.color = color;
                    }
                    for (var i = 0; i < oTable.rows.length; i++) {                                
                        var oTR = oTable.rows[i];
                        for (var j = 0; j < oTR.cells.length; j++) {
                            var oTD = oTR.cells[j];
                                    
                            if (applyto === 'table' ||
                                (applyto === 'evenrows' && isEven(i + 1)) ||
                                (applyto === 'oddrows' && !isEven(i + 1)) ||
                                (applyto === 'currentrow' && oTR === this.builder.activeTd.parentNode ) ||
                                (applyto === 'currentcol' && j === getCellIndex(oTable, oRow, oCell))
                            ) {
                                oTD.style.color = color;
                            }
                        }
                    }

                    elm.style.backgroundColor = color; // preview
                    
                }, btn.style.backgroundColor);
            });

            btn = tableModal.querySelector('.input-table-bordercolor');
            btn.addEventListener('click', (e) => {

                this.builder.uo.saveForUndo();
                
                let elm = e.target;
                this.builder.colorPicker.open((color)=>{
                
                    if(!this.builder.activeTd) return;
                    
                    var borderwidth = tableModal.querySelector('#selCellBorderWidth').value;
                    if(borderwidth==='0'){
                        tableModal.querySelector('#selCellBorderWidth').value = 1;
                        borderwidth = 1;
                    }

                    //Apply format
                    var applyto = tableModal.querySelector('#selTableApplyTo').value;
                    var oTable = this.builder.activeTable;
                    var oRow = this.builder.activeTd.parentNode;
                    var oCell = this.builder.activeTd;
                                            
                    if (applyto === 'currentcell') {
                        this.builder.activeTd.style.borderWidth = borderwidth + 'px';
                        this.builder.activeTd.style.borderStyle = 'solid';
                        this.builder.activeTd.style.borderColor = color;
                    }
                    for (var i = 0; i < oTable.rows.length; i++) {                                
                        var oTR = oTable.rows[i];
                        for (var j = 0; j < oTR.cells.length; j++) {
                            var oTD = oTR.cells[j];
                                    
                            if (applyto === 'table' ||
                                (applyto === 'evenrows' && isEven(i + 1)) ||
                                (applyto === 'oddrows' && !isEven(i + 1)) ||
                                (applyto === 'currentrow' && oTR === this.builder.activeTd.parentNode ) ||
                                (applyto === 'currentcol' && j === getCellIndex(oTable, oRow, oCell)) 
                            ) {
                                oTD.style.borderWidth = borderwidth + 'px';
                                oTD.style.borderStyle = 'solid';
                                oTD.style.borderColor = color;
                            }
                        }
                    }  

                    elm.style.backgroundColor = color; // preview
                
                }, btn.style.backgroundColor);
            });

            let selBorderWidth = tableModal.querySelector('#selCellBorderWidth');
            selBorderWidth.addEventListener('change', () => {
                
                if(!this.builder.activeTd) return;

                this.builder.uo.saveForUndo();

                let val = selBorderWidth.value; 
                    
                let bordercolor = tableModal.querySelector('.input-table-bordercolor').style.backgroundColor;
                if(bordercolor===''){   
                    bordercolor = '#000000';
                }
                
                //Apply format
                var applyto = tableModal.querySelector('#selTableApplyTo').value;
                var oTable = this.builder.activeTable;
                var oRow = this.builder.activeTd.parentNode;
                var oCell = this.builder.activeTd;

                if (applyto === 'currentcell') {
                    this.builder.activeTd.style.borderWidth = val + 'px';
                    this.builder.activeTd.style.borderStyle = 'solid';
                    this.builder.activeTd.style.borderColor = bordercolor;
                    if(val==='0'){
                        this.builder.activeTd.style.borderWidth = '';
                        this.builder.activeTd.style.borderStyle = '';
                        this.builder.activeTd.style.borderColor = '';

                        tableModal.querySelector('.input-table-bordercolor').style.backgroundColor = '';
                    }
                }

                for (var i = 0; i < oTable.rows.length; i++) {                                
                    var oTR = oTable.rows[i];
                    for (var j = 0; j < oTR.cells.length; j++) {
                        var oTD = oTR.cells[j];
                                    
                        if (applyto === 'table' ||
                            (applyto === 'evenrows' && isEven(i + 1)) ||
                            (applyto === 'oddrows' && !isEven(i + 1)) ||
                            (applyto === 'currentrow' && oTR === this.builder.activeTd.parentNode ) ||
                            (applyto === 'currentcol' && j === getCellIndex(oTable, oRow, oCell)) 
                        ) {
                            oTD.style.borderWidth = val + 'px';
                            oTD.style.borderStyle = 'solid';
                            oTD.style.borderColor = bordercolor;
                            if(val==='0'){
                                oTD.style.borderWidth = '';
                                oTD.style.borderStyle = '';
                                oTD.style.borderColor = '';

                                tableModal.querySelector('.input-table-bordercolor').style.backgroundColor = '';
                            }
                        }
                    }
                } 
                
                //Trigger Change event
                this.builder.opts.onChange();

            });

            //Table Layout
                            
            btn = tableModal.querySelector('[data-table-cmd="rowabove"]');
            btn.addEventListener('click', () => {
                
                if(!this.builder.activeTd) return;

                //Save for Undo
                this.builder.uo.saveForUndo();

                let oTable = this.builder.activeTable;
                let oRow = this.builder.activeTd.parentNode;

                let oNewRow = oTable.insertRow(oRow.rowIndex);

                for (var i = 0; i < oRow.cells.length; i++) {
                    var oNewCell = oNewRow.insertCell(oNewRow.cells.length);
                    oNewCell.setAttribute('style', this.builder.activeTd.getAttribute('style')); 
                    oNewCell.setAttribute('valign', 'top'); 
                    oNewCell.innerHTML = '<br>'; 
                }
                
                //Trigger Change event
                this.builder.opts.onChange();
            });

            btn = tableModal.querySelector('[data-table-cmd="rowbelow"]');
            btn.addEventListener('click', () => {
                
                if(!this.builder.activeTd) return;

                //Save for Undo
                this.builder.uo.saveForUndo();

                let oTable = this.builder.activeTable;
                let oRow = this.builder.activeTd.parentNode;

                let oNewRow = oTable.insertRow(oRow.rowIndex + 1);

                for (var i = 0; i < oRow.cells.length; i++) {
                    var oNewCell = oNewRow.insertCell(oNewRow.cells.length);
                    oNewCell.setAttribute('style', this.builder.activeTd.getAttribute('style')); 
                    oNewCell.setAttribute('valign', 'top'); 
                    oNewCell.innerHTML = '<br>'; 
                }
                
                //Trigger Change event
                this.builder.opts.onChange();
            });


            btn = tableModal.querySelector('[data-table-cmd="columnleft"]');
            btn.addEventListener('click', () => {

                if(!this.builder.activeTd) return;

                //Save for Undo
                this.builder.uo.saveForUndo();

                let oTable = this.builder.activeTable;
                let oCell = this.builder.activeTd;
                
                var nCellIndex = oCell.cellIndex;

                for (var i = 0; i < oTable.rows.length; i++) {
                    var oRowTmp = oTable.rows[i];
                    var oNewCell = oRowTmp.insertCell(nCellIndex);
                    oNewCell.setAttribute('style', this.builder.activeTd.getAttribute('style')); 
                    oNewCell.setAttribute('valign', 'top'); 
                    oNewCell.innerHTML = '<br>'; 
                }
                
                //Trigger Change event
                this.builder.opts.onChange();
            });

            btn = tableModal.querySelector('[data-table-cmd="columnright"]');
            btn.addEventListener('click', () => {
                
                if(!this.builder.activeTd) return;

                //Save for Undo
                this.builder.uo.saveForUndo();

                let oTable = this.builder.activeTable;
                let oCell = this.builder.activeTd;
                
                var nCellIndex = oCell.cellIndex;

                for (var i = 0; i < oTable.rows.length; i++) {
                    var oRowTmp = oTable.rows[i];
                    var oNewCell = oRowTmp.insertCell(nCellIndex + 1);
                    oNewCell.setAttribute('style', this.builder.activeTd.getAttribute('style')); 
                    oNewCell.setAttribute('valign', 'top'); 
                    oNewCell.innerHTML = '<br>'; 
                }
                
                //Trigger Change event
                this.builder.opts.onChange();
            });


            btn = tableModal.querySelector('[data-table-cmd="delrow"]');
            btn.addEventListener('click', () => {
                
                if(!this.builder.activeTd) return;

                //Save for Undo
                this.builder.uo.saveForUndo();

                let oTable = this.builder.activeTable;
                let oRow = this.builder.activeTd.parentNode;
                
                oTable.deleteRow(oRow.rowIndex);

                this.builder.activeTable = null;
                this.builder.activeTd = null;

                if (oTable.rows.length === 0) {
                    oTable.parentNode.removeChild(oTable);
                }
                
                //Trigger Change event
                this.builder.opts.onChange();
            });

            btn = tableModal.querySelector('[data-table-cmd="delcolumn"]');
            btn.addEventListener('click', () => {
                
                if(!this.builder.activeTd) return;

                //Save for Undo
                this.builder.uo.saveForUndo();

                let oTable = this.builder.activeTable;
                let oCell = this.builder.activeTd;
                
                var nCellIndex = oCell.cellIndex;
                for (var i = 0; i < oTable.rows.length; i++) oTable.rows[i].deleteCell(nCellIndex); 
                
                this.builder.activeTable = null;
                this.builder.activeTd = null;
                                    
                if (oTable.rows[0].cells.length === 0) {
                    oTable.parentNode.removeChild(oTable);
                }
                
                //Trigger Change event
                this.builder.opts.onChange();
            });

            btn = tableModal.querySelector('[data-table-cmd="mergecell"]');
            btn.addEventListener('click', () => {

                if(!this.builder.activeTd) return;

                //Save for Undo
                this.builder.uo.saveForUndo();

                let oTable = this.builder.activeTable;
                let oRow = this.builder.activeTd.parentNode;
                let oCell = this.builder.activeTd;
                
                oCell.colSpan = oCell.colSpan + 1; /*LATER: Merge 2 cell which has already colspan.*/

                if (oCell.cellIndex + 1 < oTable.rows[oRow.rowIndex].cells.length) {
                    oTable.rows[oRow.rowIndex].deleteCell(oCell.cellIndex + 1);
                }
                
                //Trigger Change event
                this.builder.opts.onChange();
            });


        }
        this.tableTool = tableTool;
        this.tableModal = tableModal;

    }

    click(e) {

        if (dom.parentsHasElement(e.target, 'table')) { // only edit table.default

            let element = e.target;
            let td;
            let table;
            if(element.tagName.toLowerCase() === 'td') {
                td = element;
            } else {
                while(element.tagName.toLowerCase()!=='td') {
                    element = element.parentNode;
                }
                td = element;
            }
            while(element.tagName.toLowerCase()!=='table') {
                element = element.parentNode;
            }
            table = element;

            if(dom.hasClass(table,'default')) { // only edit table.default

                this.builder.activeTd = td;
                this.builder.activeTable = table;

                let elm = table;

                this.tableTool.style.display = 'flex';
                let _toolwidth = this.tableTool.offsetWidth; //to get value, element must not hidden (display:none). So set display:flex before this.
            
                let w = elm.offsetWidth;
                let top = elm.getBoundingClientRect().top + window.pageYOffset;
                let left = elm.getBoundingClientRect().left - 2;
                left = left + (w - _toolwidth);
                                                
                //Adjust left in case an element is outside the screen
                const _screenwidth = window.innerWidth;
                if(_toolwidth+left>_screenwidth) left = elm.getBoundingClientRect().left;

                this.tableTool.style.top = top + 'px';
                this.tableTool.style.left = left + 'px';

            } else {
    
                this.builder.activeTd = null;
                this.builder.activeTable = null;
    
                this.tableTool.style.display = '';

            }

        } else {
    
            this.builder.activeTd = null;
            this.builder.activeTable = null;

            this.tableTool.style.display = '';
        }

        if(dom.hasClass(this.tableModal, 'active') && this.builder.activeTable) {
            
            let activeTd = this.builder.activeTd;

            this.tableModal.querySelector('.input-table-bgcolor').style.backgroundColor = activeTd.style.backgroundColor;
            this.tableModal.querySelector('.input-table-textcolor').style.backgroundColor = activeTd.style.color;
            this.tableModal.querySelector('.input-table-bordercolor').style.backgroundColor = activeTd.style.borderColor;
            this.tableModal.querySelector('#selCellBorderWidth').value = parseInt(activeTd.style.borderWidth);

        } else {

            this.tableModal.querySelector('.input-table-bgcolor').style.backgroundColor = '';
            this.tableModal.querySelector('.input-table-textcolor').style.backgroundColor = '';
            this.tableModal.querySelector('.input-table-bordercolor').style.backgroundColor = '';
            this.tableModal.querySelector('#selCellBorderWidth').value = 0;

        }

    }
}

// Table
function isEven(someNumber) {
    return (someNumber % 2 === 0) ? true : false;
}

function getCellIndex(oTable, oTR, oTD) {
    var nCount = 0;
    var bFinish = false;
    for (var i = 0; i < oTR.cells.length; i++) {
        if (bFinish === false) {
            nCount += oTR.cells[i].colSpan;
        }
        if (oTD === oTR.cells[i]) bFinish = true;
    }
    nCount = nCount - (oTD.colSpan - 1);

    var nCellIndex = nCount - 1;
    return nCellIndex;
}

export default Table;