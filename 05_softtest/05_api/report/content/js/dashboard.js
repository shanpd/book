/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();
    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter)
        regexp = new RegExp(seriesFilter, 'i');

    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
			"color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9918032786885246, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)  ", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "BeanShell Sampler"], "isController": false}, {"data": [1.0, 500, 1500, "学院查询-指定"], "isController": false}, {"data": [1.0, 500, 1500, "学生-新增"], "isController": false}, {"data": [1.0, 500, 1500, "班级-删除-学生班级"], "isController": false}, {"data": [1.0, 500, 1500, "BeanShell Sampler -clsid提取全局变量"], "isController": false}, {"data": [1.0, 500, 1500, "班级查询-指定"], "isController": false}, {"data": [1.0, 500, 1500, "班级-查询-List-cls_id_list"], "isController": false}, {"data": [1.0, 500, 1500, "学生查询-所有"], "isController": false}, {"data": [1.0, 500, 1500, "学院删除-指定"], "isController": false}, {"data": [1.0, 500, 1500, "学生-查询-List-stu_name_list"], "isController": false}, {"data": [1.0, 500, 1500, "学院-更新"], "isController": false}, {"data": [1.0, 500, 1500, "学生-查询-条件"], "isController": false}, {"data": [1.0, 500, 1500, "学院查询-组合"], "isController": false}, {"data": [1.0, 500, 1500, "班级查询-所有"], "isController": false}, {"data": [1.0, 500, 1500, "学生-更新"], "isController": false}, {"data": [1.0, 500, 1500, "JDBC Request"], "isController": false}, {"data": [1.0, 500, 1500, "学院查询-模糊"], "isController": false}, {"data": [1.0, 500, 1500, "学生-删除-指定"], "isController": false}, {"data": [1.0, 500, 1500, "学院-查询-List-dep_id_list"], "isController": false}, {"data": [1.0, 500, 1500, "学院查询-所有"], "isController": false}, {"data": [1.0, 500, 1500, "学生-查询-stu_id_list"], "isController": false}, {"data": [1.0, 500, 1500, "班级-删除-指定"], "isController": false}, {"data": [1.0, 500, 1500, "班级-查询-List-cls_name_list"], "isController": false}, {"data": [1.0, 500, 1500, "学院-查询-List-master_name_list"], "isController": false}, {"data": [1.0, 500, 1500, "班级-查询-List-master_name_list"], "isController": false}, {"data": [1.0, 500, 1500, "班级-删除-List"], "isController": false}, {"data": [1.0, 500, 1500, "学院-查询-List-slogan_list"], "isController": false}, {"data": [1.0, 500, 1500, "学生查询-指定"], "isController": false}, {"data": [1.0, 500, 1500, "学院删除-list"], "isController": false}, {"data": [1.0, 500, 1500, "Debug Sampler"], "isController": false}, {"data": [1.0, 500, 1500, "班级-更新"], "isController": false}, {"data": [1.0, 500, 1500, "学院-查询-List-dep_name_list"], "isController": false}, {"data": [1.0, 500, 1500, "班级-查询-slogan_list"], "isController": false}, {"data": [0.75, 500, 1500, "班级-新增"], "isController": false}, {"data": [1.0, 500, 1500, "班级-查询-组合"], "isController": false}, {"data": [1.0, 500, 1500, "学院-新增"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 61, 0, 0.0, 69.37704918032784, 274.6, 430.7, 602.0, 11.902439024390244, 3.908917682926829, 2.333079268292683, 0, 602], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average response time", "90th pct", "95th pct", "99th pct", "Throughput", "Received KB/sec", "Sent KB/sec", "Min", "Max"], "items": [{"data": ["BeanShell Sampler", 1, 0, 0.0, 1.0, 1.0, 1.0, 1.0, 1000.0, 0.0, 0.0, 1, 1], "isController": false}, {"data": ["学院查询-指定", 1, 0, 0.0, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 43.9453125, 28.878348214285715, 7, 7], "isController": false}, {"data": ["学生-新增", 1, 0, 0.0, 431.0, 431.0, 431.0, 431.0, 2.320185614849188, 1.853429524361949, 2.1389211136890953, 431, 431], "isController": false}, {"data": ["班级-删除-学生班级", 1, 0, 0.0, 103.0, 103.0, 103.0, 103.0, 9.70873786407767, 1.7919447815533982, 2.1996359223300974, 103, 103], "isController": false}, {"data": ["BeanShell Sampler -clsid提取全局变量", 2, 0, 0.0, 0.5, 1.0, 1.0, 1.0, 1.998001998001998, 0.0, 0.0, 0, 1], "isController": false}, {"data": ["班级查询-指定", 1, 0, 0.0, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 49.94419642857143, 31.947544642857142, 7, 7], "isController": false}, {"data": ["班级-查询-List-cls_id_list", 1, 0, 0.0, 11.0, 11.0, 11.0, 11.0, 90.9090909090909, 36.48792613636364, 22.283380681818183, 11, 11], "isController": false}, {"data": ["学生查询-所有", 1, 0, 0.0, 12.0, 12.0, 12.0, 12.0, 83.33333333333333, 63.55794270833333, 19.368489583333332, 12, 12], "isController": false}, {"data": ["学院删除-指定", 2, 0, 0.0, 108.5, 116.0, 116.0, 116.0, 0.6418485237483953, 0.118466182605905, 0.1319424943838254, 101, 116], "isController": false}, {"data": ["学生-查询-List-stu_name_list", 1, 0, 0.0, 15.0, 15.0, 15.0, 15.0, 66.66666666666667, 50.84635416666667, 17.96875, 15, 15], "isController": false}, {"data": ["学院-更新", 1, 0, 0.0, 106.0, 106.0, 106.0, 106.0, 9.433962264150942, 2.902048938679245, 3.6482900943396226, 106, 106], "isController": false}, {"data": ["学生-查询-条件", 1, 0, 0.0, 14.0, 14.0, 14.0, 14.0, 71.42857142857143, 36.411830357142854, 17.996651785714285, 14, 14], "isController": false}, {"data": ["学院查询-组合", 1, 0, 0.0, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 39.93055555555556, 28.971354166666668, 9, 9], "isController": false}, {"data": ["班级查询-所有", 1, 0, 0.0, 17.0, 17.0, 17.0, 17.0, 58.8235294117647, 44.979319852941174, 12.408088235294116, 17, 17], "isController": false}, {"data": ["学生-更新", 1, 0, 0.0, 137.0, 137.0, 137.0, 137.0, 7.299270072992701, 3.343122718978102, 4.505018248175182, 137, 137], "isController": false}, {"data": ["JDBC Request", 17, 0, 0.0, 27.05882352941176, 90.59999999999968, 449.0, 449.0, 4.24893776555861, 0.18696497750562358, 0.0, 0, 449], "isController": false}, {"data": ["学院查询-模糊", 1, 0, 0.0, 9.0, 9.0, 9.0, 9.0, 111.1111111111111, 84.63541666666667, 23.87152777777778, 9, 9], "isController": false}, {"data": ["学生-删除-指定", 2, 0, 0.0, 113.5, 125.0, 125.0, 125.0, 16.0, 2.953125, 3.9140625, 102, 125], "isController": false}, {"data": ["学院-查询-List-dep_id_list", 1, 0, 0.0, 14.0, 14.0, 14.0, 14.0, 71.42857142857143, 39.76004464285714, 16.46205357142857, 14, 14], "isController": false}, {"data": ["学院查询-所有", 1, 0, 0.0, 13.0, 13.0, 13.0, 13.0, 76.92307692307693, 126.20192307692308, 14.94891826923077, 13, 13], "isController": false}, {"data": ["学生-查询-stu_id_list", 1, 0, 0.0, 16.0, 16.0, 16.0, 16.0, 62.5, 31.8603515625, 16.41845703125, 16, 16], "isController": false}, {"data": ["班级-删除-指定", 1, 0, 0.0, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 1.5253744834710745, 1.8724173553719008, 121, 121], "isController": false}, {"data": ["班级-查询-List-cls_name_list", 1, 0, 0.0, 12.0, 12.0, 12.0, 12.0, 83.33333333333333, 41.9921875, 20.751953125, 12, 12], "isController": false}, {"data": ["学院-查询-List-master_name_list", 1, 0, 0.0, 10.0, 10.0, 10.0, 10.0, 100.0, 45.80078125, 25.29296875, 10, 10], "isController": false}, {"data": ["班级-查询-List-master_name_list", 1, 0, 0.0, 15.0, 15.0, 15.0, 15.0, 66.66666666666667, 33.59375, 17.057291666666668, 15, 15], "isController": false}, {"data": ["班级-删除-List", 1, 0, 0.0, 273.0, 273.0, 273.0, 273.0, 3.663003663003663, 0.6796588827838828, 0.9372138278388278, 273, 273], "isController": false}, {"data": ["学院-查询-List-slogan_list", 1, 0, 0.0, 12.0, 12.0, 12.0, 12.0, 83.33333333333333, 38.167317708333336, 20.426432291666668, 12, 12], "isController": false}, {"data": ["学生查询-指定", 1, 0, 0.0, 12.0, 12.0, 12.0, 12.0, 83.33333333333333, 38.167317708333336, 20.100911458333332, 12, 12], "isController": false}, {"data": ["学院删除-list", 1, 0, 0.0, 187.0, 187.0, 187.0, 187.0, 5.347593582887701, 0.9922292780748663, 1.2063419117647058, 187, 187], "isController": false}, {"data": ["Debug Sampler", 5, 0, 0.0, 0.4, 2.0, 2.0, 2.0, 1.6666666666666667, 0.6295572916666666, 0.0, 0, 2], "isController": false}, {"data": ["班级-更新", 1, 0, 0.0, 105.0, 105.0, 105.0, 105.0, 9.523809523809526, 3.3296130952380953, 4.7898065476190474, 105, 105], "isController": false}, {"data": ["学院-查询-List-dep_name_list", 1, 0, 0.0, 17.0, 17.0, 17.0, 17.0, 58.8235294117647, 26.941636029411764, 14.533547794117647, 17, 17], "isController": false}, {"data": ["班级-查询-slogan_list", 1, 0, 0.0, 12.0, 12.0, 12.0, 12.0, 83.33333333333333, 41.9921875, 21.158854166666668, 12, 12], "isController": false}, {"data": ["班级-新增", 2, 0, 0.0, 515.0, 602.0, 602.0, 602.0, 1.4005602240896358, 1.1215423669467788, 1.2624190301120448, 428, 602], "isController": false}, {"data": ["班级-查询-组合", 1, 0, 0.0, 10.0, 10.0, 10.0, 10.0, 100.0, 37.98828125, 27.63671875, 10, 10], "isController": false}, {"data": ["学院-新增", 2, 0, 0.0, 293.5, 312.0, 312.0, 312.0, 1.524390243902439, 0.7562404725609756, 0.8157869664634146, 275, 312], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Percentile 1
            case 5:
            // Percentile 2
            case 6:
            // Percentile 3
            case 7:
            // Throughput
            case 8:
            // Kbytes/s
            case 9:
            // Sent Kbytes/s
            case 10:
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0);
    
    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);
    
        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 61, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);
    
});
