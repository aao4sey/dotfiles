import { BasicRuleBuilder } from "karabiner_ts_rule";
import { rule, writeToProfile, FromKeyParam, map, ToKeyParam } from "karabiner_ts"

type ArrowType = 'up' | 'down' | 'left' | 'right'
type ArrowConvertMapType = {
  [key in ArrowType]: {
    from: FromKeyParam,
    to: ToKeyParam
  }
}

const ArrowConvertMap: ArrowConvertMapType = {
  'up': {
    from: 'i',
    to: 'up_arrow'
  },
  'down': {
    from: 'k',
    to: 'down_arrow'
  },
  'left': {
    from: 'j',
    to: 'left_arrow'
  },
  'right': {
    from: 'l',
    to: 'right_arrow'
  }
}

const generateArrowRulesFor = (arrowType: ArrowType): Array<BasicRuleBuilder> => {
  const from_key_param = ArrowConvertMap[arrowType]['from']
  const to_key_param = ArrowConvertMap[arrowType]['to']
  return [
    rule(`${arrowType}_arrow`).manipulators([
      map(from_key_param, ['fn']).to(
        to_key_param
      )
    ]),
    rule(`${arrowType}_arrow + left_control`).manipulators([
      map(from_key_param, ['fn', 'left_control']).to(
        to_key_param, 'left_control'
      )
    ]),
    rule(`${arrowType}_arrow + left_shift`).manipulators([
      map(from_key_param, ['fn', 'left_shift']).to(
        to_key_param, 'left_shift'
      )
    ]),
    rule(`${arrowType}_arrow + left_command + left_option`).manipulators([
      map(from_key_param, ['fn', 'left_command', 'left_option']).to(
        to_key_param, ['left_command', 'left_option']
      )
    ]),
    rule(`${arrowType}_arrow + left_shift + left_option`).manipulators([
      map(from_key_param, ['fn', 'left_shift', 'left_option']).to(
        to_key_param, ['left_shift', 'left_option']
      )
    ]),
    rule(`${arrowType}_arrow + left_option`).manipulators([
      map(from_key_param, ['fn', 'left_option']).to(
        to_key_param, ['left_option']
      )
    ]),
  ]
}

const commonRules = (): Array<BasicRuleBuilder> => {
  return [
    rule('grave accent').manipulators([
      map('u', 'fn').to(
        'grave_accent_and_tilde'
      )
    ]),
    rule('tilda').manipulators([
      map('u', ['fn', 'left_shift']).to(
        'grave_accent_and_tilde', 'left_shift'
      )
    ]),
    // up
    ...generateArrowRulesFor('up'),

    // down
    ...generateArrowRulesFor('down'),

    // left
    ...generateArrowRulesFor('left'),

    // right
    ...generateArrowRulesFor('right'),

    // home
    rule('home').manipulators([
      map('h', ['fn']).to(
        'home'
      )
    ]),
    rule('home with selecting').manipulators([
      map('h', ['fn', 'left_shift']).to(
        'home', 'left_shift'
      )
    ]),

    // end
    rule('end').manipulators([
      map('n', ['fn']).to(
        'end'
      )
    ]),
    rule('end with selecting').manipulators([
      map('n', ['fn', 'left_shift']).to(
        'end', 'left_shift'
      )
    ])
  ]
}

writeToProfile('Lofree Edge', [...commonRules()])
writeToProfile('NuphyAir60', [...commonRules()])
writeToProfile('Macbook', [...commonRules()])
