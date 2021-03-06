// @flow
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'

import styles from './CharmStyles.js'
import CharmDisplay from './CharmDisplay.jsx'
import CharmFilter from './CharmFilter.jsx'
import SpellDisplay from './SpellDisplay.jsx'
import CharacterLoadError from '../CharacterLoadError.jsx'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import {
  getSpecificCharacter,
  getNativeCharmsForCharacter,
  getMartialArtsCharmsForCharacter,
  getEvocationsForCharacter,
  getSpellsForCharacter,
  getSpiritCharmsForCharacter,
} from 'selectors'
import type { Character, Charm, Spell } from 'utils/flow-types'

type Props = {
  character: Character,
  nativeCharms: Array<Charm>,
  martialArtsCharms: Array<Charm>,
  evocations: Array<Charm>,
  spells: Array<Spell>,
  spiritCharms: Array<Charm>,
  classes: Object,
}
type State = {
  filtersOpen: boolean,
  abilityFilter: string,
  styleFilter: string,
  artifactFilter: string,
  circleFilter: string,
  categoryFilter: Array<string>,
  openCharm: number | null,
  openSpell: number | null,
}
class CharmFullPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      filtersOpen: false,
      abilityFilter: '',
      styleFilter: '',
      artifactFilter: '',
      circleFilter: '',
      categoryFilter: [],
      openCharm: null,
      openSpell: null,
    }
    this.setFilter = this.setFilter.bind(this)
    this.toggleFiltersOpen = this.toggleFiltersOpen.bind(this)
    this.setOpenCharm = this.setOpenCharm.bind(this)
    this.setOpenSpell = this.setOpenSpell.bind(this)
  }

  toggleFiltersOpen = () => {
    this.setState({ filtersOpen: !this.state.filtersOpen })
  }

  setFilter = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  setOpenCharm = charm => (e, expanded) =>
    this.setState({ openCharm: expanded ? charm : null })

  setOpenSpell = spell => (e, expanded) =>
    this.setState({ openSpell: expanded ? spell : null })

  render() {
    /* Escape hatch */
    if (this.props.character == undefined) return <CharacterLoadError />

    const {
      character,
      nativeCharms,
      martialArtsCharms,
      evocations,
      spiritCharms,
      spells,
      classes,
    } = this.props
    const {
      abilityFilter,
      categoryFilter,
      styleFilter,
      artifactFilter,
      circleFilter,
      openCharm,
      openSpell,
      filtersOpen,
    } = this.state
    const { toggleFiltersOpen, setFilter, setOpenCharm, setOpenSpell } = this

    let filteredNatives = nativeCharms,
      filteredMA = martialArtsCharms,
      filteredEvo = evocations,
      filteredSpirit = spiritCharms,
      filteredSpells = spells

    const filterByCategory = charm =>
      categoryFilter.every(cat => charm.categories.includes(cat))
    if (abilityFilter !== '')
      filteredNatives = filteredNatives.filter(c => c.ability === abilityFilter)
    if (styleFilter !== '')
      filteredMA = filteredMA.filter(c => c.style === styleFilter)
    if (artifactFilter !== '')
      filteredEvo = filteredEvo.filter(c => c.artifact_name === artifactFilter)
    if (circleFilter !== '')
      filteredSpells = filteredSpells.filter(c => c.circle === circleFilter)
    if (categoryFilter.length > 0) {
      filteredNatives = filteredNatives.filter(filterByCategory)
      filteredMA = filteredMA.filter(filterByCategory)
      filteredEvo = filteredEvo.filter(filterByCategory)
      filteredSpirit = filteredSpirit.filter(filterByCategory)
      filteredSpells = filteredSpells.filter(filterByCategory)
    }

    const natives = filteredNatives.map(c => (
      <Grid item xs={12} md={6} xl={4} key={c.id}>
        <CharmDisplay
          charm={c}
          character={character}
          openCharm={openCharm}
          onOpenChange={setOpenCharm}
        />
      </Grid>
    ))
    const maCharms = filteredMA.map(c => (
      <Grid item xs={12} md={6} xl={4} key={c.id}>
        <CharmDisplay
          charm={c}
          character={character}
          openCharm={openCharm}
          onOpenChange={setOpenCharm}
        />
      </Grid>
    ))
    const evo = filteredEvo.map(c => (
      <Grid item xs={12} md={6} xl={4} key={c.id}>
        <CharmDisplay
          charm={c}
          character={character}
          openCharm={openCharm}
          onOpenChange={setOpenCharm}
        />
      </Grid>
    ))
    const spirit = filteredSpirit.map(c => (
      <Grid item xs={12} md={6} xl={4} key={c.id}>
        <CharmDisplay
          charm={c}
          character={character}
          openCharm={openCharm}
          onOpenChange={setOpenCharm}
        />
      </Grid>
    ))
    const spl = filteredSpells.map(c => (
      <Grid item xs={12} md={6} xl={4} key={c.id}>
        <SpellDisplay
          spell={c}
          character={character}
          openSpell={openSpell}
          onOpenChange={setOpenSpell}
        />
      </Grid>
    ))

    return (
      <Grid container spacing={24}>
        <DocumentTitle title={`${character.name} Charms | Lot-Casting Atemi`} />

        <Hidden smUp>
          <Grid item xs={12}>
            <div style={{ height: '1em' }}>&nbsp;</div>
          </Grid>
        </Hidden>

        {character.type !== 'Character' && (
          <Grid item xs={12} className={classes.stickyHeader}>
            <Typography variant="headline">
              Charms
              <CharmFilter
                id={character.id}
                charmType="native"
                currentAbility={abilityFilter}
                currentCategory={categoryFilter}
                open={filtersOpen}
                toggleOpen={toggleFiltersOpen}
                onChange={setFilter}
              />
            </Typography>
          </Grid>
        )}
        {natives}

        {martialArtsCharms.length > 0 && (
          <Grid item xs={12} className={classes.stickyHeader}>
            <Typography variant="headline">
              Martial Arts
              <CharmFilter
                id={character.id}
                charmType="martial_arts"
                currentAbility={styleFilter}
                currentCategory={categoryFilter}
                open={filtersOpen}
                toggleOpen={toggleFiltersOpen}
                onChange={setFilter}
              />
            </Typography>
          </Grid>
        )}
        {maCharms}

        {evocations.length > 0 && (
          <Grid item xs={12} className={classes.stickyHeader}>
            <Typography variant="headline">
              Evocations
              <CharmFilter
                id={character.id}
                charmType="evocation"
                currentAbility={artifactFilter}
                currentCategory={categoryFilter}
                open={filtersOpen}
                toggleOpen={toggleFiltersOpen}
                onChange={setFilter}
              />
            </Typography>
          </Grid>
        )}
        {evo}

        {spiritCharms.length > 0 && (
          <Grid item xs={12} className={classes.stickyHeader}>
            <Typography variant="headline">
              Spirit Charms
              <CharmFilter
                id={character.id}
                charmType="spirit"
                currentAbility={''}
                currentCategory={categoryFilter}
                open={filtersOpen}
                toggleOpen={toggleFiltersOpen}
                onChange={setFilter}
              />
            </Typography>
          </Grid>
        )}
        {spirit}

        {(spells.length > 0 || character.is_sorcerer) && (
          <Grid item xs={12} className={classes.stickyHeader}>
            <Typography variant="headline">
              Spells
              <CharmFilter
                id={character.id}
                charmType="spell"
                currentAbility={circleFilter}
                currentCategory={categoryFilter}
                open={filtersOpen}
                toggleOpen={toggleFiltersOpen}
                onChange={setFilter}
              />
            </Typography>
          </Grid>
        )}
        {spl}
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.characterId
  const character = getSpecificCharacter(state, id)

  let nativeCharms = []
  let martialArtsCharms = []
  let evocations = []
  let spiritCharms = []
  let spells = []

  if (character !== undefined) {
    nativeCharms = getNativeCharmsForCharacter(state, id)
    martialArtsCharms = getMartialArtsCharmsForCharacter(state, id)
    evocations = getEvocationsForCharacter(state, id)
    spells = getSpellsForCharacter(state, id)
    spiritCharms = getSpiritCharmsForCharacter(state, id)
  }

  return {
    character,
    nativeCharms,
    martialArtsCharms,
    evocations,
    spells,
    spiritCharms,
  }
}

export default ProtectedComponent(
  withStyles(styles)(connect(mapStateToProps)(CharmFullPage))
)
