import React from 'react';
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";

function Export({transformedData = [], exportRef}) {
    
    return (
        <div hidden>
        <ExcelExport  data={transformedData} ref={exportRef}>
              <Grid
                data={transformedData}
                style={{
                  height: "420px",
                }}
              >
                <GridToolbar>
                </GridToolbar>
                <GridColumn field="womanId" title="Woman ID" width="50px" />
                <GridColumn field="localityId" title="Locality ID" width="350px" />
                <GridColumn field="officer" title="Officer" />
                <GridColumn field="collect_on" title="Date Taken" />
                <GridColumn field="height" title="Woman's Height" />
                <GridColumn field="weight" title="Woman's Weight" />
                <GridColumn field="biceps" title="Woman's Biceps" />
                <GridColumn field="triceps" title="Woman's Triceps" />
                <GridColumn field="hip" title="Woman's Hip" />
                <GridColumn field="pressure" title="Woman's Pressure" />
                <GridColumn field="fat" title="Woman's Fat" />
                <GridColumn field="age" title="Woman's Age" />
                <GridColumn field="waist" title="Woman's Waist" />
                <GridColumn field="101" title="Question Reference 101" />
                <GridColumn field="102" title="Question Reference 102" />
                <GridColumn field="103" title="Question Reference 103" />
                <GridColumn field="104" title="Question Reference 104" />
                <GridColumn field="105" title="Question Reference 105" />
                <GridColumn field="106" title="Question Reference 106" />
                <GridColumn field="107" title="Question Reference 107" />
                <GridColumn field="108" title="Question Reference 108" />
                <GridColumn field="109" title="Question Reference 109" />
                <GridColumn field="110" title="Question Reference 110" />
                <GridColumn field="112" title="Question Reference 112" />
                <GridColumn field="113" title="Question Reference 113" />
                <GridColumn field="114" title="Question Reference 114" />
                <GridColumn field="115" title="Question Reference 115" />
                <GridColumn field="116" title="Question Reference 116" />
                <GridColumn field="201" title="Question Reference 201" />
                <GridColumn field="202" title="Question Reference 202" />
                <GridColumn field="203" title="Question Reference 203" />
                <GridColumn field="204" title="Question Reference 204" />
                <GridColumn field="205" title="Question Reference 205" />
                <GridColumn field="206" title="Question Reference 206" />
                <GridColumn field="207" title="Question Reference 207" />
                <GridColumn field="208" title="Question Reference 208" />
                <GridColumn field="601" title="Question Reference 601" />
                <GridColumn field="602" title="Question Reference 602" />
                <GridColumn field="603" title="Question Reference 603" />
                <GridColumn field="604" title="Question Reference 604" />
                <GridColumn field="605" title="Question Reference 605" />
                <GridColumn field="606" title="Question Reference 606" />
                <GridColumn field="607" title="Question Reference 607" />
                <GridColumn field="608" title="Question Reference 608" />
                <GridColumn field="609" title="Question Reference 609" />
                <GridColumn field="610" title="Question Reference 610" />
                <GridColumn field="611" title="Question Reference 611" />
                <GridColumn field="612" title="Question Reference 612" />
                <GridColumn field="613" title="Question Reference 613" />
                <GridColumn field="614" title="Question Reference 614" />
                <GridColumn field="615" title="Question Reference 615" />
                <GridColumn field="616" title="Question Reference 616" />
                <GridColumn field="617" title="Question Reference 617" />
                <GridColumn field="618" title="Question Reference 618" />
                <GridColumn field="620" title="Question Reference 620" />
                <GridColumn field="624" title="Question Reference 624" />
                <GridColumn field="625" title="Question Reference 625" />
                <GridColumn field="626" title="Question Reference 626" />
                <GridColumn field="627" title="Question Reference 627" />
                <GridColumn field="628" title="Question Reference 628" />
                <GridColumn field="629" title="Question Reference 629" />
                <GridColumn field="630" title="Question Reference 630" />
                <GridColumn field="631" title="Question Reference 631" />
                <GridColumn field="632" title="Question Reference 632" />
                <GridColumn field="633" title="Question Reference 633" />
              </Grid>
            </ExcelExport>
        
        
        </div>
    );
}

export default Export;