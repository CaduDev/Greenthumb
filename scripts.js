import axios from 'axios';
import noResults from './images/illustrations/no-results.png'
import 
{
  drop1,
  drop2,
  drop3,
  pick,
  lowSun,
  noSun,
  highSun,
  pet,
  toxic  
} from './images/index'


(function () {
  // import img1 from './images/icons'

  const width = window.innerWidth

  const sunlight = document.getElementById('sunlight')
  const water = document.getElementById('water')
  const chew = document.getElementById('chew')
  const firstMessageContainer = document.getElementById('first_message-container')
  const itensContent = document.getElementById('content')
  const buttonScrollToTop = document.getElementById('back_to_the_top')

  sunlight.addEventListener('change', (e) => {
    const valueChew = chew.value
    const valueWater = water.value
    buttonScrollToTop.style.display = 'none'

    if(!(valueChew && valueWater)) {
      return
    }

    axios.get(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${e.target.value}&water=${valueWater}&pets=${valueChew}`, {})
    .then(({ data }) => {
      firstMessageContainer.innerHTML = ''
      itensContent.innerHTML = ''
      makerFirstMessage(data.length > 0)
      dataProcessing(data);
      buttonScrollToTop.style.display = 'block'
    })
    .catch(error => {
        console.log(error)
    })
  })

  water.addEventListener('change', (e) => {
    const valueSunlight = sunlight.value
    const valueChew = chew.value
    buttonScrollToTop.style.display = 'none'

    if(!(valueSunlight && valueChew)) {
      return
    }

    axios.get(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${valueSunlight}&water=${e.target.value}&pets=${valueChew}`, {})
    .then(({ data }) => {
      firstMessageContainer.innerHTML = ''
      itensContent.innerHTML = ''
      dataProcessing(data)
      makerFirstMessage(data.length > 0)
      buttonScrollToTop.style.display = 'block'
    })
    .catch(error => {
        console.log(error)
    })
  })

  chew.addEventListener('change', (e) => {
    const valueSunlight = sunlight.value
    const valueWater = water.value
    buttonScrollToTop.style.display = 'none'

    if(!(valueSunlight && valueWater)) {
      return
    }

    axios.get(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${valueSunlight}&water=${valueWater}&pets=${e.target.value}`, {})
    .then(({ data }) => {
      firstMessageContainer.innerHTML = ''
      itensContent.innerHTML = ''
      dataProcessing(data)
      makerFirstMessage(data.length > 0)
      buttonScrollToTop.style.display = 'block'
    })
    .catch(error => {
        console.log(error)
    })
  })

  buttonScrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  })

  function dataProcessing(items) {
    let first_five = [];
    let rest = [];

    if(items.filter(res => res.staff_favorite === true).length > 0) {
      const newItems = [];

      newItems.push(items.filter(res => res.staff_favorite === true)[0])
      items.filter(res => res.staff_favorite === false).map(res => newItems.push(res))

      for(let i = 0; i < newItems.length; i++) {
        if(i < 5) {
          first_five.push(newItems[i])
        } else {
          rest.push(newItems[i])
        }
      }

      let newArrayfirst_five = [[],[]]

      for(let i = 0; i < first_five.length; i++) {
        
        if(i==0) {
          newArrayfirst_five[0].push(first_five[i])
        } else {
          newArrayfirst_five[1].push(first_five[i])
        }
      }

      const divRow = getEelment('div', 'row');

      for(let i = 0; i < newArrayfirst_five.length; i++) {
        
        const divCol5 = getEelment('div', 'col-5');

        let rows = []
        let count = 1
        let index = 0

        for(let a = 0; a < newArrayfirst_five[i].length; a++) {
          const item = newArrayfirst_five[i][a];

          if(item.staff_favorite) {
            makeCard(item, divCol5, item.staff_favorite)
          } else { 
            if(count === 1) {
              rows.push([])
            }

            if(count < 3) {
              rows[index].push(item)
            } 

            count++

            if(count > 2) {
              count = 1
              index++
            }
          }
        }

        // console.log(linhas)
        
        rows.map(resColum => {
          const divRow2 = getEelment('div', 'row');

          resColum.map((resCard) => {
            const divCol5_2 = getEelment('div', 'col-5');

            makeCard(resCard, divCol5_2, false)

            divRow2.appendChild(divCol5_2)
          })

          divCol5.appendChild(divRow2)  
        })

        divRow.appendChild(divCol5)  
      }

      itensContent.appendChild(divRow)


      if(rest.length > 0) {
        let rows = []
        let contador = 1
        let index = 0
  
        for(let i = 0; i < rest.length; i++) {
          if(contador === 1) {
            rows.push([])
          }
  
          if(contador < 5) {
            rows[index].push(rest[i])
          } 
  
          contador++
  
          if(contador > 4) {
            contador = 1
            index++
          } 
  
        }

        console.log(rest)
  
        rows.map(resRow => {
          const divRow_2 = getEelment('div', 'row');
  
          resRow.map(resCard => {
            const divCol1 = getEelment('div', 'col-1');
  
            makeCard(resCard, divCol1, false)
  
  
            divRow_2.appendChild(divCol1)  
          })
  
          itensContent.appendChild(divRow_2)
        })
      }

    } else {
      let rows = []
      let contador = 1
      let index = 0

      for(let i = 0; i < items.length; i++) {
        if(contador === 1) {
          rows.push([])
        }

        if(contador < 5) {
          rows[index].push(items[i])
        } 

        contador++

        if(contador > 4) {
          contador = 1
          index++
        } 

      }

      rows.map(resRow => {
        const divRow = getEelment('div', 'row');

        resRow.map(resCard => {
          const divCol1 = getEelment('div', 'col-1');

          makeCard(resCard, divCol1, false)


          divRow.appendChild(divCol1)  
        })

        itensContent.appendChild(divRow)
      })
    }
  }

  function getEelment(element, className) {
    const newElement = document.createElement(element);

    if(className) {
      newElement.className = className;
    }

    return newElement
  }

  function makeCard(item, col, staff_favorite) {
    const divCardsStaff = getEelment('div', 'card staff-favorite');
    const divCards = getEelment('div', 'card');
    if(width < 500) {
      divCards.style.width = `${width}px !important`
    }
    const divCardContent = getEelment('div', 'card-content');
    const divStaffFavoriteMarked = getEelment('div', 'staff-favorite-marked');
    const span = getEelment('span');
    span.appendChild(document.createTextNode(`✨ Staff favorite`));
    const divContentImage = getEelment('div', 'content-image');
    const imgPlant = getEelment('img', 'content-image');
    imgPlant.src = item.url
    const divInfoContent = getEelment('div', 'info-content');
    const pTitlePlant = getEelment('p');
    pTitlePlant.appendChild(document.createTextNode(item.name));
    const divInfo = getEelment('div', 'info');
    const divPrice = getEelment('div', 'price');
    divPrice.appendChild(document.createTextNode(`$${item.price}`));
    const divAttrContent = getEelment('div', 'attr-content');
    const spanAttr1 = getEelment('span', 'attr');
    const spanAttr2 = getEelment('span', 'attr');
    const spanAttr3 = getEelment('span', 'attr');

    divInfoContent.appendChild(pTitlePlant)
    divInfo.appendChild(divPrice)
    spanAttr2.appendChild(getIcon(item, 'toxicity'))
    spanAttr3.appendChild(getIcon(item, 'sun'))
    spanAttr1.appendChild(getIcon(item, 'water'))
    divAttrContent.appendChild(spanAttr1)
    divAttrContent.appendChild(spanAttr2)
    divAttrContent.appendChild(spanAttr3)
    divInfo.appendChild(divAttrContent)
    if(staff_favorite) {
      divStaffFavoriteMarked.appendChild(span)
      divCardContent.appendChild(divStaffFavoriteMarked)
    }
    divContentImage.appendChild(imgPlant)
    divCardContent.appendChild(divContentImage)
    divInfoContent.appendChild(divInfo)
    divCardContent.appendChild(divInfoContent)
    if(staff_favorite) {
      divCardsStaff.appendChild(divCardContent)
      col.appendChild(divCardsStaff)
    } else {
      divCards.appendChild(divCardContent)
      col.appendChild(divCards)
    }
  }

  function getIcon(item, type) {
    const imgAttr = getEelment('img');

    console.log(item)

    switch(type) {
      case 'water':
        
        switch(item.water) {
          case 'rarely':
            imgAttr.style.width= '19px';
            imgAttr.src = drop1;
            break;
            case 'regularly':
            imgAttr.style.width= '19px';
            imgAttr.src = drop2;
            break;
            case 'daily':
            imgAttr.style.width= '25px';
            imgAttr.style.marginTop= '2px';
            imgAttr.src = drop3;
          break;
          default:
        }
      break;
      case 'toxicity':
        
        switch(item.toxicity) {
          case true:
            imgAttr.style.width= '19px';
            imgAttr.src = toxic;
            break;
            case false:
            imgAttr.style.width= '24px';
            imgAttr.src = pet;
          break;
          default:
        }
      break;
      case 'sun':
        imgAttr.style.width= '20px';
        
        switch(item.sun) {
          case 'low':
            imgAttr.src = lowSun;
          break;
          case 'no':
            imgAttr.src = noSun;
          break;
          case 'high':
            imgAttr.src = highSun;
          break;
          default:
            imgAttr.src = noSun;
        }
      break;
      default:
        console.log('')
    }

    return imgAttr
  }
  
  function makerFirstMessage(type_message) {
    const textMessage = type_message? 'Our picks for you' : 'No results yet…';
    const styles = type_message ? 'success' : 'not_found'
    const divFirstMessage = getEelment('div', 'first_message '+styles);
    const divNotFoundMessage = getEelment('div', 'first_message-text');
    const h1 = getEelment('h1', styles);
    h1.appendChild(document.createTextNode(textMessage));
    const img = getEelment('img', '');
    
    if(type_message) {
      divFirstMessage.style.flexDirection = 'column';
      img.style.width = width < 500 ? '58%' : '32%'
      img.src = pick
      divFirstMessage.appendChild(img)
      divFirstMessage.appendChild(divNotFoundMessage)
      divNotFoundMessage.appendChild(h1)
    } else {
      
      img.src = noResults
      divNotFoundMessage.appendChild(h1)
      divFirstMessage.appendChild(divNotFoundMessage)
      divFirstMessage.appendChild(img)
      const h3 = getEelment('h3', '');
      h3.appendChild(document.createTextNode(`Use the filters above to find the plant that best fits your environment :)`));
      divNotFoundMessage.appendChild(h3)
    }

    // divNotFoundMessage.appendChild(h1)
    firstMessageContainer.appendChild(divFirstMessage);
  }

})();