// @flow
import { attr } from '../..'
import { weaponOverwhelming } from '../../weapons'
import type { Character, fullWeapon, Pool } from 'utils/flow-types'

function weaponDamageBonus(weapon: fullWeapon) {
  if (weapon.tags.includes('subtle')) return 0

  let damage = 0

  switch (weapon.weight) {
    case 'medium':
      damage = 9
      break
    case 'heavy':
      damage = 11
      break
    case 'light':
    default:
      damage = 7
      break
  }

  if (weapon.is_artifact) damage += 3

  return damage
}

export function witheringDamage(
  character: Character,
  weapon: fullWeapon
): Pool {
  const damage = weaponDamageBonus(weapon) + weapon.bonus_damage
  let _attr = weapon.damage_attr
  let attrRating = attr(character, _attr)

  let bonus = []
  let specialAttacks = []
  let b = 0
  let powDamage

  if (weapon.tags.includes('subtle')) {
    bonus = bonus.concat([{ label: 'subtle', noFull: true }])
    _attr = 'subtle'
    attrRating = 0
    specialAttacks = specialAttacks.concat(['subtle'])
  } else if (weapon.tags.includes('flame')) {
    bonus = bonus.concat([{ label: 'flame', noFull: true }])
    _attr = 'flame'
    attrRating = 4
  } else if (weapon.tags.includes('crossbow')) {
    bonus = bonus.concat([{ label: 'crossbow', noFull: true }])
    _attr = 'crossbow'
    attrRating = 4
  } else if (weapon.tags.includes('firearm')) {
    bonus = bonus.concat([{ label: 'firearm', noFull: true }])
    _attr = 'firearm'
    attrRating = 4
  }
  if (weapon.tags.includes('shield')) {
    bonus = bonus.concat([{ label: 'shield', bonus: -2 }])
    b -= 2
  }
  if (weapon.tags.includes('powerful')) {
    specialAttacks = specialAttacks.concat(['powerful'])
    powDamage =
      attrRating + weaponDamageBonus({ ...weapon, weight: 'heavy' }) + b
  }
  if (weapon.tags.includes('poisonable'))
    specialAttacks = specialAttacks.concat(['poisonable'])

  const overwhelming = weaponOverwhelming(character, weapon)

  return {
    name: weapon.name + ' Withering Damage',
    attribute: _attr,
    attributeRating: attrRating,
    weaponDamage: damage,
    powerfulDamage: weapon.tags.includes('powerful') ? powDamage : undefined,
    raw: attrRating + damage,
    totalPenalty: -b,
    total: Math.max(attrRating + damage + b, overwhelming),
    minimum: overwhelming,
    specialAttacks: specialAttacks,
    bonus: bonus,
  }
}
