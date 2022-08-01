import React from 'react';
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { ExcelExport } from "@progress/kendo-react-excel-export";
function ExportStudentData({exportRef, transformedData}) {
    

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
                <GridColumn field="posted_on" title="Date Taken" width="50px" />
                <GridColumn field="question" title="Question" width="350px" />
                <GridColumn field="answer" title="Answer" />
              </Grid>
            </ExcelExport>
        
        
        </div>
    );
}

export default ExportStudentData;