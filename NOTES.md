query LoadNutritionDatabase {
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

query loadIngredient($foodId:String!)  {
  
  currentCsv(ndbNo: {eq: $foodId}) {
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