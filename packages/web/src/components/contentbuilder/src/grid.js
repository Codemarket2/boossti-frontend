import { Util, Dom } from './util.js';

const dom = new Dom();

export class Grid{

    constructor(builder) {
        this.builder = builder;
        this.columnTool = new ColumnTool(builder); 
        this.rowTool = new RowTool(builder);
        this.util = new Util(this.builder);
    }

    moveColumnPrevious() {
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;

        if(cell.previousElementSibling) {

            this.builder.uo.saveForUndo();

            cell.parentElement.insertBefore(cell, cell.previousElementSibling); 
            columnTool.position(cell);

            this.builder.opts.onChange();
        }
    }

    moveColumnNext() {
        let columnTool = this.columnTool;
        let util = this.util;
        
        const cell = util.cellSelected();
        if(!cell) return;

        const cellnext = util.cellNext(cell);
        if(cellnext) {

            this.builder.uo.saveForUndo();
            
            cell.parentElement.insertBefore(cellnext, cell); 
            columnTool.position(cell);
            
            this.builder.opts.onChange();
        }
    }

    moveColumnUp() {
        let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;

        let row = cell.parentNode;
        if (row.childElementCount - 2 === 1) {//-2 => minus is-row-tool & is-rowadd-tool
            if (row.previousElementSibling) {

                let maxCols = 4;
                if(this.builder.maxColumns) {
                    maxCols = this.builder.maxColumns;
                }
                
                if((row.previousElementSibling.childElementCount>= maxCols + 2) || row.previousElementSibling.hasAttribute('data-protected')){ //+2 => includes is-row-tool & is-rowaddtool

                    this.builder.uo.saveForUndo();

                    //Move row up
                    row.parentNode.insertBefore(row, row.previousElementSibling);
                    columnTool.position(cell);
            
                    this.builder.opts.onChange();

                    return;
                } else {

                    this.builder.uo.saveForUndo();

                    //Add inside prev row
                    let tool = row.previousElementSibling.querySelector('.is-row-tool');
                    row.previousElementSibling.removeChild(tool); //remove next row tool
                    tool = row.previousElementSibling.querySelector('.is-rowadd-tool');
                    row.previousElementSibling.removeChild(tool); //remove next row tool

                    row.previousElementSibling.appendChild(cell); //add
                    
                    row.parentNode.removeChild(row); //remove current (empty) row

                    builder.applyBehavior(); //re-add tool
                    
                    columnTool.position(cell);
                    cell.click(); //refresh active cell/row
            
                    this.builder.opts.onChange();

                }
            } else {
                //move outside container (move to previous container)
                return;
            }
        } else {
            this.builder.uo.saveForUndo();

            var rowElement = row.cloneNode(true);
            rowElement.innerHTML = '';
            rowElement.appendChild(cell);
            row.parentNode.insertBefore(rowElement, row); 

            builder.applyBehavior(); //re-add tool

            columnTool.position(cell);
            cell.click(); //refresh active cell/row
            
            this.builder.opts.onChange();
        }

        //fix layout
        row = cell.parentNode; //update active row
        util.fixLayout(row, builder);
        if(row.nextElementSibling) util.fixLayout(row.nextElementSibling, builder);
    }

    moveColumnDown() {
        let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;

        let row = cell.parentNode;
        if (row.childElementCount - 2 === 1) {//-2 => minus is-row-tool & is-rowadd-tool
            
            if (row.nextElementSibling) {

                let maxCols = 4;
                if(this.builder.maxColumns) {
                    maxCols = this.builder.maxColumns;
                }

                if((row.nextElementSibling.childElementCount>= maxCols + 2) || row.nextElementSibling.hasAttribute('data-protected')){ //+2 => includes is-row-tool & is-rowadd-tool

                    this.builder.uo.saveForUndo();

                    //Move row down
                    row.parentNode.insertBefore(row.nextElementSibling, row);
                    columnTool.position(cell);
            
                    this.builder.opts.onChange();

                    return;
                } else {

                    this.builder.uo.saveForUndo();

                    //Add inside next row
                    let tool = row.nextElementSibling.querySelector('.is-row-tool');
                    row.nextElementSibling.removeChild(tool); //remove next row tool
                    tool = row.nextElementSibling.querySelector('.is-rowadd-tool');
                    row.nextElementSibling.removeChild(tool); //remove next row tool

                    row.nextElementSibling.appendChild(cell); //add
                    
                    row.parentNode.removeChild(row); //remove current (empty) row

                    builder.applyBehavior(); //re-add tool

                    columnTool.position(cell);
                    cell.click(); //refresh active cell/row
            
                    this.builder.opts.onChange();
                }
            } else {
                //move outside container (move to next container)
                return;
            }
        } else {
            this.builder.uo.saveForUndo();

            var rowElement = row.cloneNode(true);
            rowElement.innerHTML = '';
            rowElement.appendChild(cell);
            dom.moveAfter(rowElement, row);

            builder.applyBehavior(); //re-add tool

            columnTool.position(cell);
            cell.click(); //refresh active cell/row
            
            this.builder.opts.onChange();
        }

        //fix layout
        row = cell.parentNode; //update active row
        util.fixLayout(row, builder);
        if(row.previousElementSibling) util.fixLayout(row.previousElementSibling, builder);
    }

    duplicateColumn() {
        let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;

        this.builder.uo.saveForUndo();

        var cellElement = cell.cloneNode(true);
        dom.removeClass(cellElement, 'cell-active');
        cellElement.removeAttribute('data-click');

        let row = cell.parentNode;

        let maxCols = 4;
        if(this.builder.maxColumns) {
            maxCols = this.builder.maxColumns;
        }
        if(row.childElementCount >= maxCols + 2){ //+2 => is-row-tool & is-rowadd-tool
            alert(util.out('You have reached the maximum number of columns'));
            return false;   
        }

        row.insertBefore(cellElement, cell);

        util.fixLayout(row, builder);

        builder.applyBehavior();

        columnTool.position(cell);
        cell.click(); //refresh active cell/row
            
        this.builder.opts.onChange();
    }

    removeColumn() {
        let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;
        let row = cell.parentNode;

        columnTool.hide(); //Hide Column tool

        util.confirm(util.out('Are you sure you want to delete this block?'), (ok) => {

            if(ok) {
                this.builder.uo.saveForUndo();

                if(row.childElementCount - 2 === 1) {//-2 => minus is-row-tool & is-rowadd-tool
                    row.parentNode.removeChild(row);

                    util.checkEmpty();
                } else {
                    row.removeChild(cell);

                    util.fixLayout(row, builder);
                }

                util.clearActiveCell();
            
                this.builder.opts.onChange();
                
            } else {

                setTimeout(()=>{
                    columnTool.position(cell);
                    columnTool.show();
                }, 200);
            }

        });
    }

    increaseColumn() {
        let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;

        let cellnext = util.cellNext(cell);
        let cellnext2;
        if(!cellnext) {
            cellnext = cell.previousElementSibling;
            if(!cellnext) return;
            cellnext2 = cellnext.previousElementSibling;
        } else {
            cellnext2 = util.cellNext(cellnext);
            if(!cellnext2) cellnext2 = cell.previousElementSibling;
        }

        const rowClass = builder.opts.row; 
        const colClass = builder.opts.cols; 
        const colSizes = builder.opts.colsizes;
        if(rowClass!=='' && colClass.length> 0 && colSizes.length>0){
            
            if(cellnext2){
                for (let i = 0; i < colSizes.length; i++) {
                    let group = colSizes[i];
                    for (let j = 0; j < group.length; j++) {

                        if(group[j].length === 3){

                            if(dom.hasClass(cell, group[j][0]) && dom.hasClass(cellnext, group[j][1]) && dom.hasClass(cellnext2, group[j][2])) {
                                if(j+1===group.length){
                                    //cannot be increased
                                } else {
                                    this.builder.uo.saveForUndo();

                                    dom.removeClass(cell, group[j][0]);
                                    dom.removeClass(cellnext, group[j][1]);
                                    dom.removeClass(cellnext2, group[j][2]);
                                    dom.addClass(cell, group[j+1][0]);
                                    dom.addClass(cellnext, group[j+1][1]);
                                    dom.addClass(cellnext2, group[j+1][2]);

                                    columnTool.position(cell);
            
                                    this.builder.opts.onChange();

                                    return;
                                }
                            }

                        } 
                    }
                }
            }

            for (let i = 0; i < colSizes.length; i++) {
                let group = colSizes[i];
                for (let j = 0; j < group.length; j++) {

                    if(group[j].length === 2){

                        if(dom.hasClass(cell, group[j][0]) && dom.hasClass(cellnext, group[j][1])) {
                            if(j+1===group.length){
                                //cannot be increased
                            } else {
                                this.builder.uo.saveForUndo();

                                dom.removeClass(cell, group[j][0]);
                                dom.removeClass(cellnext, group[j][1]);
                                dom.addClass(cell, group[j+1][0]);
                                dom.addClass(cellnext, group[j+1][1]);

                                columnTool.position(cell);
            
                                this.builder.opts.onChange();

                                return;
                            }
                        }
                    }
                }
            }

            columnTool.position(cell);
            return;
        }

        //others (12 columns grid)       
        if(rowClass!=='' && colClass.length>0){

            if (!dom.hasClass(cell, colClass[11])) {//if not column full

                if(dom.hasClass(cell, colClass[11])){
                    return;
                }  
                if(dom.hasClass(cellnext, colClass[0])){
                    return;
                }

                this.builder.uo.saveForUndo();
                
                if(dom.hasClass(cell, colClass[10])){
                    dom.removeClass(cell, colClass[10]);
                    dom.addClass(cell, colClass[11]);
                } else if(dom.hasClass(cell, colClass[9])){
                    dom.removeClass(cell, colClass[9]);
                    dom.addClass(cell, colClass[10]);
                } else if(dom.hasClass(cell, colClass[8])){
                    dom.removeClass(cell, colClass[8]);
                    dom.addClass(cell, colClass[9]);
                } else if(dom.hasClass(cell, colClass[7])){
                    dom.removeClass(cell, colClass[7]);
                    dom.addClass(cell, colClass[8]);
                } else if(dom.hasClass(cell, colClass[6])){
                    dom.removeClass(cell, colClass[6]);
                    dom.addClass(cell, colClass[7]);
                } else if(dom.hasClass(cell, colClass[5])){
                    dom.removeClass(cell, colClass[5]);
                    dom.addClass(cell, colClass[6]);
                } else if(dom.hasClass(cell, colClass[4])){
                    dom.removeClass(cell, colClass[4]);
                    dom.addClass(cell, colClass[5]);
                } else if(dom.hasClass(cell, colClass[3])){
                    dom.removeClass(cell, colClass[3]);
                    dom.addClass(cell, colClass[4]);
                } else if(dom.hasClass(cell, colClass[2])){
                    dom.removeClass(cell, colClass[2]);
                    dom.addClass(cell, colClass[3]);
                } else if(dom.hasClass(cell, colClass[1])){
                    dom.removeClass(cell, colClass[1]);
                    dom.addClass(cell, colClass[2]);
                } else if(dom.hasClass(cell, colClass[0])){
                    dom.removeClass(cell, colClass[0]);
                    dom.addClass(cell, colClass[1]);
                }

                if(dom.hasClass(cellnext, colClass[1])){
                    dom.removeClass(cellnext, colClass[1]);
                    dom.addClass(cellnext, colClass[0]);
                } else if(dom.hasClass(cellnext, colClass[2])){
                    dom.removeClass(cellnext, colClass[2]);
                    dom.addClass(cellnext, colClass[1]);
                } else if(dom.hasClass(cellnext, colClass[3])){
                    dom.removeClass(cellnext, colClass[3]);
                    dom.addClass(cellnext, colClass[2]);
                } else if(dom.hasClass(cellnext, colClass[4])){
                    dom.removeClass(cellnext, colClass[4]);
                    dom.addClass(cellnext, colClass[3]);
                } else if(dom.hasClass(cellnext, colClass[5])){
                    dom.removeClass(cellnext, colClass[5]);
                    dom.addClass(cellnext, colClass[4]);
                } else if(dom.hasClass(cellnext, colClass[6])){
                    dom.removeClass(cellnext, colClass[6]);
                    dom.addClass(cellnext, colClass[5]);
                } else if(dom.hasClass(cellnext, colClass[7])){
                    dom.removeClass(cellnext, colClass[7]);
                    dom.addClass(cellnext, colClass[6]);
                } else if(dom.hasClass(cellnext, colClass[8])){
                    dom.removeClass(cellnext, colClass[8]);
                    dom.addClass(cellnext, colClass[7]);
                } else if(dom.hasClass(cellnext, colClass[9])){
                    dom.removeClass(cellnext, colClass[9]);
                    dom.addClass(cellnext, colClass[8]);
                } else if(dom.hasClass(cellnext, colClass[10])){
                    dom.removeClass(cellnext, colClass[10]);
                    dom.addClass(cellnext, colClass[9]);
                } else if(dom.hasClass(cellnext, colClass[11])){
                    dom.removeClass(cellnext, colClass[11]);
                    dom.addClass(cellnext, colClass[10]);
                }

                columnTool.position(cell);
            
                this.builder.opts.onChange();

            }
        }
    }

    decreaseColumn() {
        let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;

        let cellnext = util.cellNext(cell);
        let cellnext2;
        if(!cellnext) {
            cellnext = cell.previousElementSibling;
            if(!cellnext) return;
            cellnext2 = cellnext.previousElementSibling;
        } else {
            cellnext2 = util.cellNext(cellnext);
            if(!cellnext2) cellnext2 = cell.previousElementSibling;
        }

        const rowClass = builder.opts.row; 
        const colClass = builder.opts.cols; 
        const colSizes = builder.opts.colsizes;
        if(rowClass!=='' && colClass.length> 0 && colSizes.length>0){

            if(cellnext2){
                for (let i = 0; i < colSizes.length; i++) {
                    let group = colSizes[i];
                    for (let j = 0; j < group.length; j++) {

                        if(group[j].length === 3){

                            if(dom.hasClass(cell, group[j][0]) && dom.hasClass(cellnext, group[j][1]) && dom.hasClass(cellnext2, group[j][2])) {
                                if(j===0){
                                    //cannot be decreased
                                } else {
                                    this.builder.uo.saveForUndo();

                                    dom.removeClass(cell, group[j][0]);
                                    dom.removeClass(cellnext, group[j][1]);
                                    dom.removeClass(cellnext2, group[j][2]);
                                    dom.addClass(cell, group[j-1][0]);
                                    dom.addClass(cellnext, group[j-1][1]);
                                    dom.addClass(cellnext2, group[j-1][2]);

                                    columnTool.position(cell);
            
                                    this.builder.opts.onChange();

                                    return;
                                }
                            }

                        } 
                    }
                }
            }

            for (let i = 0; i < colSizes.length; i++) {
                let group = colSizes[i];
                for (let j = 0; j < group.length; j++) {

                    if(group[j].length === 2){

                        if(dom.hasClass(cell, group[j][0]) && dom.hasClass(cellnext, group[j][1])) {
                            if(j===0){
                                //cannot be decreased
                            } else {
                                this.builder.uo.saveForUndo();

                                dom.removeClass(cell, group[j][0]);
                                dom.removeClass(cellnext, group[j][1]);
                                dom.addClass(cell, group[j-1][0]);
                                dom.addClass(cellnext, group[j-1][1]);

                                columnTool.position(cell);
            
                                this.builder.opts.onChange();

                                return;
                            }
                        }
                    }
                }
            }

            columnTool.position(cell);
            return;
        }

        //others (12 columns grid)       
        // const rowClass = builder.opts.row; //row
        // const colClass = builder.opts.cols; //['col s1', 'col s2', 'col s3', 'col s4', 'col s5', 'col s6', 'col s7', 'col s8', 'col s9', 'col s10', 'col s11', 'col s12']
        if(rowClass!=='' && colClass.length>0){

            if (!dom.hasClass(cell, colClass[11])) {//if not column full

                if(dom.hasClass(cell, colClass[0])){
                    return;
                }
                if(dom.hasClass(cellnext, colClass[11])){
                    return;
                }

                this.builder.uo.saveForUndo();

                if(dom.hasClass(cell, colClass[11])){
                    dom.removeClass(cell, colClass[11]);
                    dom.addClass(cell, colClass[10]);
                } else if(dom.hasClass(cell, colClass[10])){
                    dom.removeClass(cell, colClass[10]);
                    dom.addClass(cell, colClass[9]);
                } else if(dom.hasClass(cell, colClass[9])){
                    dom.removeClass(cell, colClass[9]);
                    dom.addClass(cell, colClass[8]);
                } else if(dom.hasClass(cell, colClass[8])){
                    dom.removeClass(cell, colClass[8]);
                    dom.addClass(cell, colClass[7]);
                } else if(dom.hasClass(cell, colClass[7])){
                    dom.removeClass(cell, colClass[7]);
                    dom.addClass(cell, colClass[6]);
                } else if(dom.hasClass(cell, colClass[6])){
                    dom.removeClass(cell, colClass[6]);
                    dom.addClass(cell, colClass[5]);
                } else if(dom.hasClass(cell, colClass[5])){
                    dom.removeClass(cell, colClass[5]);
                    dom.addClass(cell, colClass[4]);
                } else if(dom.hasClass(cell, colClass[4])){
                    dom.removeClass(cell, colClass[4]);
                    dom.addClass(cell, colClass[3]);
                } else if(dom.hasClass(cell, colClass[3])){
                    dom.removeClass(cell, colClass[3]);
                    dom.addClass(cell, colClass[2]);
                } else if(dom.hasClass(cell, colClass[2])){
                    dom.removeClass(cell, colClass[2]);
                    dom.addClass(cell, colClass[1]);
                } else if(dom.hasClass(cell, colClass[1])){
                    dom.removeClass(cell, colClass[1]);
                    dom.addClass(cell, colClass[0]);
                } 

                if(dom.hasClass(cellnext, colClass[0])){
                    dom.removeClass(cellnext, colClass[0]);
                    dom.addClass(cellnext, colClass[1]);
                } else if(dom.hasClass(cellnext, colClass[1])){
                    dom.removeClass(cellnext, colClass[1]);
                    dom.addClass(cellnext, colClass[2]);
                } else if(dom.hasClass(cellnext, colClass[2])){
                    dom.removeClass(cellnext, colClass[2]);
                    dom.addClass(cellnext, colClass[3]);
                } else if(dom.hasClass(cellnext, colClass[3])){
                    dom.removeClass(cellnext, colClass[3]);
                    dom.addClass(cellnext, colClass[4]);
                } else if(dom.hasClass(cellnext, colClass[4])){
                    dom.removeClass(cellnext, colClass[4]);
                    dom.addClass(cellnext, colClass[5]);
                } else if(dom.hasClass(cellnext, colClass[5])){
                    dom.removeClass(cellnext, colClass[5]);
                    dom.addClass(cellnext, colClass[6]);
                } else if(dom.hasClass(cellnext, colClass[6])){
                    dom.removeClass(cellnext, colClass[6]);
                    dom.addClass(cellnext, colClass[7]);
                } else if(dom.hasClass(cellnext, colClass[7])){
                    dom.removeClass(cellnext, colClass[7]);
                    dom.addClass(cellnext, colClass[8]);
                } else if(dom.hasClass(cellnext, colClass[8])){
                    dom.removeClass(cellnext, colClass[8]);
                    dom.addClass(cellnext, colClass[9]);
                } else if(dom.hasClass(cellnext, colClass[9])){
                    dom.removeClass(cellnext, colClass[9]);
                    dom.addClass(cellnext, colClass[10]);
                } else if(dom.hasClass(cellnext, colClass[10])){
                    dom.removeClass(cellnext, colClass[10]);
                    dom.addClass(cellnext, colClass[11]);
                }  

                columnTool.position(cell);
            
                this.builder.opts.onChange();
            }
        }
    }

    // ROW

    removeRow() {
        // let builder = this.builder;
        // let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;
        const row = cell.parentNode;

        //Change to row selection
        dom.removeClass(row, 'row-outline'); 
        this.columnTool.hide(); //Hide Column tool

        util.confirm(util.out('Are you sure you want to delete this block?'), (ok) => {

            const cell = util.cellSelected();
            if(!cell) return;
            const row = cell.parentNode; 

            if(ok) {
                this.builder.uo.saveForUndo();

                row.parentNode.removeChild(row);

                util.checkEmpty(); 
            
                this.builder.opts.onChange();
            } 

        });
    }

    moveRowUp() {
        // let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;
        let row = cell.parentNode;

        //Change to row selection
        dom.removeClass(row, 'row-outline'); 
        columnTool.hide(); //Hide Column tool

        if(row.previousElementSibling) {
            this.builder.uo.saveForUndo();

            row.parentNode.insertBefore(row, row.previousElementSibling);

            this.rowTool.position(row);
            
            this.builder.opts.onChange();

        } else {

            // Move to previous container

            let currContainer = row.parentNode;

            let prev = null;
            const builders = document.querySelectorAll(this.builder.opts.container);
            Array.prototype.forEach.call(builders, (builder) => {
                if(builder.innerHTML === currContainer.innerHTML){
                    if(prev) {

                        dom.moveAfter(row, prev.lastChild);

                        this.rowTool.position(row);

                        util.checkEmpty(); 

                        this.builder.opts.onChange();

                        return false;
                    }
                }
                prev = builder;
            });

        }
    }

    moveRowDown() {
        // let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;
        let row = cell.parentNode;

        //Change to row selection
        dom.removeClass(row, 'row-outline'); 
        columnTool.hide(); //Hide Column tool

        if(row.nextElementSibling) {
            this.builder.uo.saveForUndo();
            
            row.parentNode.insertBefore(row.nextElementSibling, row);

            this.rowTool.position(row);
            
            this.builder.opts.onChange();

        } else {

            // Move to next container

            let currContainer = row.parentNode;

            let flag = false;
            const builders = document.querySelectorAll(this.builder.opts.container);
            Array.prototype.forEach.call(builders, (builder) => {

                if (flag) {

                    builder.insertBefore(row, builder.firstChild);

                    this.rowTool.position(row);

                    util.checkEmpty(); 

                    this.builder.opts.onChange();

                    return false;
                }
                if(builder.innerHTML === currContainer.innerHTML){
                    flag = true;
                }
                
            });

        }
    }

    duplicateRow(){
        let builder = this.builder;
        let columnTool = this.columnTool;
        let util = this.util;

        const cell = util.cellSelected();
        if(!cell) return;
        let row = cell.parentNode;

        //Change to row selection
        dom.removeClass(row, 'row-outline'); 
        columnTool.hide(); //Hide Column tool

        this.builder.uo.saveForUndo();

        //Clone row & cleanup attached tool & event
        const rowElement = row.cloneNode(true);
        rowElement.removeChild(rowElement.querySelector('.is-row-tool'));
        let cols = dom.elementChildren(rowElement);
        cols.forEach((col) => {
            col.removeAttribute('data-click');
            if(col.classList.contains('cell-active')) {
                builder.activeCol = col;
            }
        });
        dom.moveAfter(rowElement, row);  

        //Unselect current row
        dom.removeClass(row, 'row-active');
        dom.removeClass(row, 'row-outline');
        cols = dom.elementChildren(row);
        cols.forEach((col) => {
            dom.removeClass(col, 'cell-active');
        });

        builder.applyBehavior();

        this.rowTool.position(rowElement);
            
        this.builder.opts.onChange();
    }

    // Utilities
    refreshColumnTool(cell) {
        let columnTool = this.columnTool;
        columnTool.position(cell);
    }

    showColumnTool() {
        let columnTool = this.columnTool;
        columnTool.show();
    }

    hideColumnTool() {
        let columnTool = this.columnTool;
        columnTool.hide();
    }

}

class RowTool{

    constructor(builder) {

        this.builder = builder;

    }

    position(row) {

        const util = new Util(this.builder);
        const builderstuff = util.builderStuff();
        let rowTool = row.querySelector('.is-row-tool');
        let rowMore = builderstuff.querySelector('.rowmore');

        dom.addClass(rowMore, 'transition1');

        const elm = rowTool.querySelector('.row-more');
        const top = elm.getBoundingClientRect().top + window.pageYOffset;
        const left = elm.getBoundingClientRect().left + window.pageXOffset;

        // const w = rowMore.offsetWidth; 
        rowMore.style.top = (top - 8) + 'px';

        dom.removeClass(rowMore,'arrow-bottom');
        dom.removeClass(rowMore,'arrow-left');
        dom.removeClass(rowMore,'arrow-right');
        dom.removeClass(rowMore,'center');
        dom.removeClass(rowMore,'right');
        dom.removeClass(rowMore,'left');

        if(this.builder.opts.rowTool === 'right') {
            
            rowMore.style.left = (left - rowMore.offsetWidth - 10) + 'px';

            dom.addClass(rowMore,'arrow-right');
            dom.addClass(rowMore,'left');

        } else {

            rowMore.style.left = (left + 35) + 'px';

            dom.addClass(rowMore,'arrow-left');
            dom.addClass(rowMore,'left');

        }

        setTimeout(()=>{
            dom.removeClass(rowMore, 'transition1');
        }, 300);
    }

}

class ColumnTool{

    constructor(builder) {

        this.builder = builder;

    }

    position(col) {

        const util = new Util(this.builder);
        const builderstuff = util.builderStuff();
        this.columnTool = builderstuff.querySelector('.is-column-tool');
        this.columnMore = builderstuff.querySelector('.columnmore');

        dom.addClass(this.columnMore, 'transition1');

        setTimeout(()=>{

            this.columnTool.style.top = (col.getBoundingClientRect().top - 29 + window.pageYOffset) + 'px';
            this.columnTool.style.left = (col.getBoundingClientRect().left - 1) + 'px';

            let top = parseInt(this.columnTool.style.top);
            let left = parseInt(this.columnTool.style.left);

            this.columnMore.style.top = (top + 35) + 'px';
            this.columnMore.style.left = (left + 19) + 'px';

            setTimeout(()=>{
                dom.removeClass(this.columnMore, 'transition1');
            }, 300);
        }, 300);
    }

    hide() {

        const util = new Util(this.builder);
        const builderstuff = util.builderStuff();
        this.columnTool = builderstuff.querySelector('.is-column-tool');
        // this.columnMore = builderstuff.querySelector('.columnmore');

        dom.removeClass(this.columnTool, 'active');
    }

    show() {
        const util = new Util(this.builder);
        const builderstuff = util.builderStuff();
        this.columnTool = builderstuff.querySelector('.is-column-tool');
        // this.columnMore = builderstuff.querySelector('.columnmore');
        dom.addClass(this.columnTool, 'active');
    }
}

export default Grid;