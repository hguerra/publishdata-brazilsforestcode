import { State } from 'store';
import { TimelineOption, View, ViewType } from 'containers/Types';

export const filter = (state: State, viewType: ViewType): View[] => {
  return state.views.filter((view: View) => view.type === viewType);
};

export const filterByName = (
  state: State,
  viewType: ViewType,
  name: string,
): View | undefined => {
  return state.views.find(
    (view: View) => view.type === viewType && view.name === name,
  );
};

export const getMapTitleEn = (state: State, t: any) => {
  if (state.currentBorder === 'None') {
    return null;
  }

  const attributesMapper: any = {
    'Natural Vegetation': t('Drawer.SideContent.attribute.chips.0.label'),
    'Forest Regenerated': t('Drawer.SideContent.attribute.chips.1.label'),
    'Planted Forest': t('Drawer.SideContent.attribute.chips.2.label'),
    Agriculture: t('Drawer.SideContent.attribute.chips.3.label'),
    'CR Carbon': t('Drawer.SideContent.attribute.chips.4.label'),
  };

  const borderMapper: any = {
    Biomes: t('Drawer.SideContent.border.chips.1.label'),
    Brazil: t('Drawer.SideContent.border.chips.2.label'),
    Regions: t('Drawer.SideContent.border.chips.3.label'),
    States: t('Drawer.SideContent.border.chips.4.label'),
  };

  const isDifference =
    TimelineOption.DIFFERENCE === state.currentTimelineOption;

  const borderPrefix = state.currentBorder === 'Brazil' ? 'in' : 'per';
  const borderDescription =
    state.currentBorder === 'None'
      ? ''
      : ` ${borderPrefix} ${borderMapper[state.currentBorder]}`;

  const unitType = state.currentAttribute === 'CR Carbon' ? 'Stock' : 'Area';

  let title = `${
    attributesMapper[state.currentAttribute]
  } ${unitType}${borderDescription} in Scenario ${state.currentScenario} for ${
    state.currentYear
  }`;
  if (isDifference) {
    title = `Change of ${
      attributesMapper[state.currentAttribute]
    } ${unitType} from ${state.changeFromYear} to ${
      state.currentYear
    } ${borderPrefix} ${borderMapper[state.currentBorder]} in Scenario ${
      state.currentScenario
    }`;
  }

  if (state.compareScenarioEnabled) {
    title = `Change of ${
      attributesMapper[state.currentAttribute]
    } ${unitType} for Scenario ${state.compareWithScenario} minus ${
      state.currentScenario
    } in ${state.currentYear} ${borderPrefix} ${
      borderMapper[state.currentBorder]
    }`;
  }

  return title;
};

export const getMapTitlePt = (state: State, t: any) => {
  if (state.currentBorder === 'None') {
    return null;
  }

  const attributesMapper: any = {
    'Natural Vegetation': t('Drawer.SideContent.attribute.chips.0.label'),
    'Forest Regenerated': t('Drawer.SideContent.attribute.chips.1.label'),
    'Planted Forest': t('Drawer.SideContent.attribute.chips.2.label'),
    Agriculture: t('Drawer.SideContent.attribute.chips.3.label'),
    'CR Carbon': t('Drawer.SideContent.attribute.chips.4.label'),
  };

  const borderMapper: any = {
    Biomes: t('Drawer.SideContent.border.chips.1.label'),
    Brazil: t('Drawer.SideContent.border.chips.2.label'),
    Regions: t('Drawer.SideContent.border.chips.3.label'),
    States: t('Drawer.SideContent.border.chips.4.label'),
  };

  const isDifference =
    TimelineOption.DIFFERENCE === state.currentTimelineOption;

  const borderPrefix = state.currentBorder === 'Brazil' ? 'no' : 'por';
  const borderDescription =
    state.currentBorder === 'None'
      ? ''
      : ` ${borderPrefix} ${borderMapper[state.currentBorder]}`;

  const unitType = state.currentAttribute === 'CR Carbon' ? 'Estoque' : 'Área';

  let title = `${unitType} de ${
    attributesMapper[state.currentAttribute]
  } ${borderDescription} no Cenário ${state.currentScenario} em ${
    state.currentYear
  }`;
  if (isDifference) {
    title = `Mudanças de ${unitType} de ${
      attributesMapper[state.currentAttribute]
    } de 2020 à ${state.currentYear} ${borderPrefix} ${
      borderMapper[state.currentBorder]
    } no Cenário ${state.currentScenario}`;
  }

  if (state.compareScenarioEnabled) {
    title = `Mudanças de ${unitType} de ${
      attributesMapper[state.currentAttribute]
    } no Cenário ${state.compareWithScenario} menos ${
      state.currentScenario
    } em ${state.currentYear} ${borderPrefix} ${
      borderMapper[state.currentBorder]
    }`;
  }

  return title;
};

/**
 * https://stackoverflow.com/questions/9960908/permutations-in-javascript
 *
 * @param selected
 * @param inputArr
 * @returns
 */
export const permutator = (inputArr: string[]): string[][] => {
  const result: string[][] = [];

  const permute = (arr: string[], m: string[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};
