import { useState } from "react"
import styles from "./App.module.css"
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/GridItem'


import { levels, calculateImc, Level } from './helpers/imc'

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [wheightField, setWheightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && wheightField) {
      setToShow(calculateImc(heightField, wheightField));

    } else {
      alert("Preencha os campos necessários para calcular seu IMC")
    }
  }

  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWheightField(0)
  }

  return (
    <div className={styles.main}>
      
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para ìndice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa</p>

          <input type="number" 
            typeof="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={heightField > 0 ? heightField : ""}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <input type="number" 
            typeof="number"
            placeholder="Digite o seu peso. Ex: 75.3 (em kg)"
            value={wheightField > 0 ? wheightField : ""}
            onChange={e => setWheightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          
          <button onClick={handleCalculateButton} disabled={toShow ? true : false} >Calcular</button>

        </div>

        <div className={styles.rightSide}>
          {!toShow && 
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }

          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>

    </div>
  )
}


export default App