import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'

import RatingDots from '../../generic/ratingDots.jsx'
import { withAbilities, fullChar } from '../../../utils/propTypes'
import { isCasteAbility, isFavoredAbility, isSupernalAbility } from '../../../utils/calculated'

const styles = theme => ({
  abilityName: { ...theme.typography.body1,
    textTransform: 'capitalize',
  },
  abilityFavored: { ...theme.typography.caption,
  },
})

function _AbilityLine(props) {
  const { classes } = props
  const rating = props.rating != undefined ? props.rating : props.character[`abil_${props.ability}`]
  const supernal = isSupernalAbility(props.character, props.ability)
  const caste = isCasteAbility(props.character, props.ability)
  const favored = isFavoredAbility(props.character, props.ability)

  return <div>
    <span className={ classes.abilityName }>
      { props.ability }:
    </span>
    <span className={ classes.abilityFavored }>
      { supernal && ' (s)' }
      { caste && !supernal && ' (c)' }
      { favored && ' (f)' }
    </span>

    <RatingDots rating={ rating } />
    <Divider />
  </div>
}
_AbilityLine.propTypes = {
  ability: PropTypes.string.isRequired,
  rating: PropTypes.number,
  character: PropTypes.shape(fullChar),
  classes: PropTypes.object,
}
const AbilityLine = withStyles(styles)(_AbilityLine)

function _CraftAbilityLine(props) {
  const { classes } = props
  const supernal = isSupernalAbility(props.character, 'craft')
  const caste = isCasteAbility(props.character, 'craft')
  const favored = isFavoredAbility(props.character, 'craft')

  return <div>
    <span className={ classes.abilityName }>
      Craft ({ props.context }):
    </span>
    <span className={ classes.abilityFavored }>
      { supernal && ' (s)' }
      { caste && !supernal && ' (c)' }
      { favored && ' (f)' }
    </span>

    <RatingDots rating={ props.rating } />
    <Divider />
  </div>
}
_CraftAbilityLine.propTypes = {
  context: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  character: PropTypes.shape(fullChar),
  classes: PropTypes.object,
}
const CraftAbilityLine = withStyles(styles)(_CraftAbilityLine)

function _MartialArtsAbilityLine(props) {
  const { classes } = props
  const supernal = isSupernalAbility(props.character, 'brawl')
  const caste = isCasteAbility(props.character, 'brawl')
  const favored = isFavoredAbility(props.character, 'brawl')

  return <div>
    <span className={ classes.abilityName }>
      Martial Arts ({ props.style }):
    </span>
    <span className={ classes.abilityFavored }>
      { supernal && ' (s)' }
      { caste && !supernal && ' (c)' }
      { favored && ' (f)' }
    </span>

    <RatingDots rating={ props.rating } />
    <Divider />
  </div>
}
_MartialArtsAbilityLine.propTypes = {
  style: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  character: PropTypes.shape(fullChar),
  classes: PropTypes.object,
}
const MartialArtsAbilityLine = withStyles(styles)(_MartialArtsAbilityLine)

export default function AbilityBlock(props) {
  const { character } = props

  let craft = ''
  if (character.abil_craft.length == 0) {
    craft = <AbilityLine ability="craft" rating={ 0 } character={ character } />
  } else {
    craft = character.abil_craft.map((craft) =>
      <CraftAbilityLine key={craft.craft} context={ craft.craft } rating={craft.rating} character={ character } />
    )
  }

  let ma = ''
  if (character.abil_martial_arts.length == 0) {
    ma = <AbilityLine ability="Martial Arts" rating={ 0 } character={ character } />
  } else {
    ma = character.abil_martial_arts.map((ma) =>
      <MartialArtsAbilityLine key={ma.style} style={ ma.style } rating={ma.rating} character={ character } />
    )
  }

  return <div>
    <AbilityLine ability="archery"       character={ character } />
    <AbilityLine ability="athletics"     character={ character } />
    <AbilityLine ability="awareness"     character={ character } />
    <AbilityLine ability="brawl"         character={ character } />
    <AbilityLine ability="bureaucracy"   character={ character } />
    { craft }
    <AbilityLine ability="dodge"         character={ character } />
    <AbilityLine ability="integrity"     character={ character } />
    <AbilityLine ability="investigation" character={ character } />
    <AbilityLine ability="larceny"       character={ character } />
    <AbilityLine ability="linguistics"   character={ character } />
    <AbilityLine ability="lore"          character={ character } />
    { ma }
    <AbilityLine ability="medicine"      character={ character } />
    <AbilityLine ability="melee"         character={ character } />
    <AbilityLine ability="occult"        character={ character } />
    <AbilityLine ability="performance"   character={ character } />
    <AbilityLine ability="presence"      character={ character } />
    <AbilityLine ability="resistance"    character={ character } />
    <AbilityLine ability="ride"          character={ character } />
    <AbilityLine ability="sail"          character={ character } />
    <AbilityLine ability="socialize"     character={ character } />
    <AbilityLine ability="stealth"       character={ character } />
    <AbilityLine ability="survival"      character={ character } />
    <AbilityLine ability="thrown"        character={ character } />
    <AbilityLine ability="war"           character={ character } />
  </div>
}

AbilityBlock.propTypes = {
  character: PropTypes.shape(withAbilities)
}