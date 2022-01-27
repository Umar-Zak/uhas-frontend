
const questions  = [
        {
            section:"Section A: Background Information",
            number:"101",
            quest:`How old (completed years) are you?`,
            options:[
                {
                    type:"number",
                    ans:"Age"
                }
            ]
        },
        {
            section:"Section A: Background Information",
            number:"102",
            quest:`What is your ethnicity?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:" Ewe"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Akan"
                },
                {   label:"C",
                    type:"radio",
                    ans:"Northerner"
                },
                {   label:"D",
                    type:"radio",
                    ans:"Ga/ Krobo"
                },
                {   label:"E",
                    type:"text",
                    ans:"Other"
                },
            ]
        },
        {
            section:"Section A: Background Information",
            number:"103",
            quest:`What is your religion?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Christian"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Muslim"
                },
                {   label:"C",
                    type:"radio",
                    ans:"Traditionalist"
                },
                 
                {   label:"D",
                    type:"text",
                    ans:"Other"
                },
            ]
        },
        {
            section:"Section A: Background Information",
            number:"104",
            quest:`What is the highest level of schooling you have completed?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"None"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Primary"
                },
                {   label:"C",
                    type:"radio",
                    ans:"Junior High School"
                },
                {   label:"D",
                    type:"radio",
                    ans:"Principal  High School"
                },
                {   label:"E",
                    type:"radio",
                    ans:"Tertiary"
                },
            ]
        },
        {
            section:"Section A: Background Information",
            number:"105",
            quest:`What is your main current occupation?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Farmer"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Trader"
                },
                {   label:"C",
                    type:"radio",
                    ans:"Teacher"
                },
                {   label:"D",
                    type:"radio",
                    ans:"Nurse/ Midwife"
                },
                {   label:"E",
                    type:"text",
                    ans:"Other"
                },
            ]
        },

        {
            section:"Section A: Background Information",
            number:"106",
            quest:`What is your household size? `,
            options:[
                {   label:"A",
                    type:"number",
                    ans:"Size"
                },
            ]
        },
        {
            section:"Section A: Background Information",
            number:"107",
            quest:`How many children under 5 years are currently staying with you? `,
            options:[
                 
                {   label:"A",
                    type:"number",
                    ans:"Number"
                },
            ]
        },
        {
            section:"Section A: Background Information",
            number:"108",
            quest:`What toilet facility is available to you?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Own WC"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Own KVIP"
                },
                {   label:"C",
                    type:"radio",
                    ans:"Public WC"
                },
                {   label:"D",
                    type:"radio",
                    ans:"Public KVIP"
                },
                {   label:"E",
                    type:"radio",
                    ans:"Bush"
                },
            ]
        },
        {
            section:"Section A: Background Information",
            number:"109",
            quest:`What water facility do you use?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Pipe borne water"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Well/ borehole"
                },
                {   label:"C",
                    type:"radio",
                    ans:"River/stream"
                },
                
            ]
        },
        {
            section:"Section A: Background Information",
            number:"110",
            quest:`In the last one month, have you taken any iron tablets or blood tonic`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                }
                
            ]
        },
        {
            section:"Section A: Background Information",
            number:"112",
            quest:`In the last 6 months, have you been told by a health professional that you have any of the following conditions? 
            Please tick all that apply`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Anemia"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Malaria"
                },
                {   label:"C",
                    type:"radio",
                    ans:"Obesity"
                },
                {   label:"D",
                    type:"radio",
                    ans:"Diabetes"
                },
                {   label:"E",
                    type:"radio",
                    ans:"Hypertension"
                },
            ]
        },
        {
            section:"Section A: Background Information",
            number:"113",
            quest:`Has any of these conditions affected your ability to feed your child in the past one month?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                
            ]
        },
        {
            section:"Section A: Background Information",
            number:"114",
            quest:`Mother’s weight`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"Weight in Kg"
                },
              
            ]
        },
        {
            section:"Section A: Background Information",
            number:"115",
            quest:`Mother’s height`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"Height in meters"
                },
              
            ]
        },
        {
            section:"Section A: Background Information",
            number:"116",
            quest:`Mother’s haemoglobin `,
            options:[
                { label:"A",
                    type:"text",
                    ans:"Haemoglobin"
                },
              
            ]
        },
        {
            section:"Section B: Food Insecurity Experience Scale",
            number:"201",
            quest:`You were worried you would run out of food because of a lack of money or other resources?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                 
            ]
        },
        {
            section:"Section B: Food Insecurity Experience Scale",
            number:"202",
            quest:`You were unable to eat healthy and nutritious food because of a lack of money or other resources?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                 
            ]
        },
        {
            section:"Section B: Food Insecurity Experience Scale",
            number:"203",
            quest:`You ate only a few kinds of foods because of a lack of money or other resources?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                 
            ]
        },
        {
            section:"Section B: Food Insecurity Experience Scale",
            number:"204",
            quest:`You had to skip a meal because there was not enough money or other resources to get food?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                 
            ]
        },
        {
            section:"Section B: Food Insecurity Experience Scale",
            number:"205",
            quest:`You ate less than you thought you should because of a lack of money or other resources?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                 
            ]
        },
        {
            section:"Section B: Food Insecurity Experience Scale",
            number:"206",
            quest:`Your household ran out of food because of a lack of money or other resources?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                 
            ]
        },
        {
            section:"Section B: Food Insecurity Experience Scale",
            number:"207",
            quest:`You were hungry but did not eat because there was not enough money or other resources for food?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                 
            ]
        },
        {
            section:"Section B: Food Insecurity Experience Scale",
            number:"208",
            quest:`You went without eating for a whole day because of a lack of money or other resources?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
                 
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"601",
            quest:`In the past 7 days, I have been`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Well"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Mildly ill"
                },
                {
                    label:"C",
                    type:"radio",
                    ans:"Moderately"
                },
                {
                    label:"D",
                    type:"radio",
                    ans:"Severely ill"
                },
            ]
        },

        {
            section:"Section C: Morbidity and Compliance",
            number:"601",
            quest:`In the past 7 days, have you experienced any of the following symptoms?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Malaria/Fever"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"Cold"
                },
                {
                    label:"C",
                    type:"radio",
                    ans:"Diarrhea"
                },
                {
                    label:"D",
                    type:"radio",
                    ans:"Difficult breathing"
                },
                {
                    label:"E",
                    type:"radio",
                    ans:"Vomiting"
                },
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"610",
            quest:`Did you go to the hospital because of the illness?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
               
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"611",
            quest:`Were you admitted for more than 1 day?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
               
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"612",
            quest:`Are you taking any vitamin-mineral supplement?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                {
                    label:"B",
                    type:"radio",
                    ans:"No"
                },
               
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"613",
            quest:`After my last visit, when did you start taking the vitamin/mineral supplement?`,
            options:[
                { label:"A",
                    type:"text",
                    ans:"When"
                },
                
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"614",
            quest:`How many times did you take the vitamin/mineral supplement yesterday?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"Quantity"
                },
                
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"615",
            quest:`Ask for the amount given (confirm with dosage on bottle)`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"Dosage"
                },
                
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"616",
            quest:`Who advised you to take the supplement?`,
            options:[
                { label:"A",
                    type:"text",
                    ans:"Name"
                },
                
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"617",
            quest:`During the past week, have you refused to take the project food?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },

                { label:"B",
                    type:"radio",
                    ans:"No"
                },
                
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"618",
            quest:`How many times during the week did you refuse to eat?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"Number"
                },
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"620",
            quest:`Yesterday, did you eat the project food?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },

                { label:"B",
                    type:"radio",
                    ans:"No"
                },
                
            ]
        },
        {
            section:"Section C: Morbidity and Compliance",
            number:"624",
            quest:`Yesterday, who else in the household ate the project food with you?`,
            options:[
                { label:"A",
                    type:"text",
                    ans:"Name"
                },
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"601",
            quest:`How is your general health today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Name"
                },
                { label:"B",
                type:"radio",
                ans:"Very good"
            },
            { label:"C",
                type:"radio",
                ans:"Good"
            },
            { label:"D",
                type:"radio",
                ans:"Fair"
            },
            { label:"E",
                type:"text",
                ans:"Other"
            },
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"602",
            quest:`How does this compare to yesterday?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Better"
                },
                { label:"B",
                type:"radio",
                ans:"The same"
            },
            { label:"C",
                type:"radio",
                ans:"Worse"
            },
            { label:"D",
                type:"radio",
                ans:"Much Worse"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"603",
            quest:`Have you felt any nausea (wanting to vomit) today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"604",
            quest:`Have you actually vomited today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"605",
            quest:`Have you had heartburn (burning in chest) today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"606",
            quest:`Have you had abdominal pain today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"607",
            quest:`Have you had a headache today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"608",
            quest:`Have you been breathless today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"609",
            quest:`Have you had diarrhea today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"610",
            quest:`Have you had constipation today?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"611",
            quest:`Nausea ?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"612",
            quest:`Heartburn ?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"613",
            quest:`Abdominal pain ?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Absent"
                },
                { label:"B",
                type:"radio",
                ans:"Mild"
            },
            { label:"C",
                type:"radio",
                ans:"Moderate"
            },
            { label:"D",
                type:"radio",
                ans:"Severe"
            },
             
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"620",
            quest:`Nausea ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"How long(mins)"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"620",
            quest:`Nausea ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"How long(mins)"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"624",
            quest:`Heartburn ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"How long(mins)"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"625",
            quest:`Abdominal pain ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"How long(mins)"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"626",
            quest:`Nausea ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"How many times"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"627",
            quest:`Heartburn ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"How many times"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"628",
            quest:`Abdominal pain   ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"How many times"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"629",
            quest:`How many times did you go to the toilet today? (specify) ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"Number"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"630",
            quest:`Is the number of times you visited the toilet normal for you ?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                { label:"B",
                    type:"radio",
                    ans:"No"
                },
                
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"631",
            quest:`How many of your toilets were black ?`,
            options:[
                { label:"A",
                    type:"number",
                    ans:"Number"
                },
                 
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"632",
            quest:`Did you take your project food today ?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                { label:"B",
                type:"radio",
                ans:"No"
            },
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"633",
            quest:`If you did not take your project food, please explain why ?`,
            options:[
                { label:"A",
                    type:"text",
                    ans:"State reason"
                },
                 
            ]
        },
        {
            section:"Section D: Gastrointestinal Side Effects",
            number:"634",
            quest:`Are your symptoms likely to be related to taking the project food ?`,
            options:[
                { label:"A",
                    type:"radio",
                    ans:"Yes"
                },
                { label:"B",
                type:"radio",
                ans:"No"
            },
            ]
        },
]


export function getQuestions(){
    return questions
}