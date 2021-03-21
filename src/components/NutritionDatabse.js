import React from "react"
import { StaticQuery, graphql } from "gatsby"

// todo: write Binary search for ingredient based on ndbNo

const NutritionDatabase = () => (
  <StaticQuery
    query={graphql`
      {
        allCurrentCsv {
          nodes {
            ndbNo
            shrtDesc
            energKcal
            proteinG
            carbG
            fiberTdG
            sugarTotG
            potassiumMg
            sodiumMg
            fatSatG
            fatMonoG
            fatPolyG
            cholestrlMg
            gmWt1
            gmWt1Desc
            gmWt2
            gmWt2Desc
            myPlateFoodGroup
            foodCategory
            myPlateServingSize
            name
          }
        }
      }
    `}
    render={data => <pre>{JSON.stringify(data, null, 4)}</pre>}
  ></StaticQuery>
)

export default NutritionDatabase