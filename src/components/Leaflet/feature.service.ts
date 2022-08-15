import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  MapPropsViewStyle,
  MapPropsViewStyleValueType,
  View,
  ViewType,
} from 'containers/Types';
import geobuf from 'geobuf';
import Pbf from 'pbf';

export const defaultViewStyleProps: MapPropsViewStyle = {
  color: '#1f2021',
  weight: 1,
  fillOpacity: 0.5,
  fillColor: '#c8c9cb',
};

export class FeatureService {
  private static instance: FeatureService;

  public readonly cache: any = {
    labels: {
      biomes: null,
      brazil: null,
      regions: null,
      states: null,
    },
    attributes: {
      biomes: null,
    },
    borders: {
      biomes: null,
      brazil: null,
      regions: null,
      states: null,
    },
  };

  private constructor() {}

  public static getInstance(): FeatureService {
    if (!FeatureService.instance) {
      FeatureService.instance = new FeatureService();
    }

    return FeatureService.instance;
  }

  public getScenarios(t: any): Promise<View[]> {
    return new Promise((resolve: any) => {
      const views = [
        {
          name: t('Drawer.SideContent.scenario.chips.0.name'),
          label: t('Drawer.SideContent.scenario.chips.0.label'),
          type: ViewType.SCENARIO,
          description: t('Drawer.SideContent.scenario.chips.0.description'),
          visible: true,
        },
        {
          name: t('Drawer.SideContent.scenario.chips.1.name'),
          label: t('Drawer.SideContent.scenario.chips.1.label'),
          type: ViewType.SCENARIO,
          description: t('Drawer.SideContent.scenario.chips.1.description'),
          visible: false,
        },
        {
          name: t('Drawer.SideContent.scenario.chips.2.name'),
          label: t('Drawer.SideContent.scenario.chips.2.label'),
          type: ViewType.SCENARIO,
          description: t('Drawer.SideContent.scenario.chips.2.description'),
          visible: false,
        },
        {
          name: t('Drawer.SideContent.scenario.chips.3.name'),
          label: t('Drawer.SideContent.scenario.chips.3.label'),
          type: ViewType.SCENARIO,
          description: t('Drawer.SideContent.scenario.chips.3.description'),
          visible: false,
        },
        {
          name: t('Drawer.SideContent.scenario.chips.4.name'),
          label: t('Drawer.SideContent.scenario.chips.4.label'),
          type: ViewType.SCENARIO,
          description: t('Drawer.SideContent.scenario.chips.4.description'),
          visible: false,
        },
      ];

      resolve(views);
    });
  }

  public getAttributesBiomes(t: any): Promise<View[]> {
    return new Promise((resolve: any) => {
      if (this.cache.attributes.biomes) {
        resolve(this.cache.attributes.biomes);
      } else {
        axios
          .get('/data/biomes-labels.pbf', {
            responseType: 'arraybuffer',
          })
          .then((response: AxiosResponse) => {
            const geojson = geobuf.decode(new Pbf(response.data));
            this.cache.labels.biomes = geojson as GeoJSON.GeoJsonObject;

            const views = [
              {
                name: t('Drawer.SideContent.attribute.chips.0.name'),
                label: t('Drawer.SideContent.attribute.chips.0.label'),
                type: ViewType.ATTRIBUTE,
                description: t(
                  'Drawer.SideContent.attribute.chips.0.description',
                ),
                visible: true,
                data: this.cache.labels.biomes,
              },
              {
                name: t('Drawer.SideContent.attribute.chips.1.name'),
                label: t('Drawer.SideContent.attribute.chips.1.label'),
                type: ViewType.ATTRIBUTE,
                description: t(
                  'Drawer.SideContent.attribute.chips.1.description',
                ),
                visible: false,
                data: this.cache.labels.biomes,
              },
              {
                name: t('Drawer.SideContent.attribute.chips.2.name'),
                label: t('Drawer.SideContent.attribute.chips.2.label'),
                type: ViewType.ATTRIBUTE,
                description: t(
                  'Drawer.SideContent.attribute.chips.2.description',
                ),
                visible: false,
                data: this.cache.labels.biomes,
              },
              {
                name: t('Drawer.SideContent.attribute.chips.3.name'),
                label: t('Drawer.SideContent.attribute.chips.3.label'),
                type: ViewType.ATTRIBUTE,
                description: t(
                  'Drawer.SideContent.attribute.chips.3.description',
                ),
                visible: false,
                data: this.cache.labels.biomes,
              },
              {
                name: t('Drawer.SideContent.attribute.chips.4.name'),
                label: t('Drawer.SideContent.attribute.chips.4.label'),
                type: ViewType.ATTRIBUTE,
                description: t(
                  'Drawer.SideContent.attribute.chips.4.description',
                ),
                visible: false,
                data: this.cache.labels.biomes,
              },
            ];

            this.cache.attributes.biomes = views;
            resolve(views);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      }
    });
  }

  public getLabelsBrazil(): Promise<View[]> {
    return new Promise((resolve: any) => {
      if (this.cache.labels.brazil) {
        resolve(this.cache.labels.brazil);
      } else {
        axios
          .get('/data/brazil-labels.pbf', {
            responseType: 'arraybuffer',
          })
          .then((response: AxiosResponse) => {
            const geojson = geobuf.decode(new Pbf(response.data));
            this.cache.labels.brazil = geojson as GeoJSON.GeoJsonObject;
            resolve(this.cache.labels.brazil);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      }
    });
  }

  public getLabelsRegions(): Promise<View[]> {
    return new Promise((resolve: any) => {
      if (this.cache.labels.regions) {
        resolve(this.cache.labels.regions);
      } else {
        axios
          .get('/data/regions-labels.pbf', {
            responseType: 'arraybuffer',
          })
          .then((response: AxiosResponse) => {
            const geojson = geobuf.decode(new Pbf(response.data));
            this.cache.labels.regions = geojson as GeoJSON.GeoJsonObject;
            resolve(this.cache.labels.regions);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      }
    });
  }

  public getLabelsStates(): Promise<View[]> {
    return new Promise((resolve: any) => {
      if (this.cache.labels.states) {
        resolve(this.cache.labels.states);
      } else {
        axios
          .get('/data/states-labels.pbf', {
            responseType: 'arraybuffer',
          })
          .then((response: AxiosResponse) => {
            const geojson = geobuf.decode(new Pbf(response.data));
            this.cache.labels.states = geojson as GeoJSON.GeoJsonObject;
            resolve(this.cache.labels.states);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      }
    });
  }

  public getBordersNone(t: any): Promise<View[]> {
    return new Promise((resolve: any) => {
      const views = [
        {
          name: t('Drawer.SideContent.border.chips.0.name'),
          label: t('Drawer.SideContent.border.chips.0.label'),
          type: ViewType.BORDER,
          description: t('Drawer.SideContent.border.chips.0.description'),
          visible: false,
        },
      ];

      resolve(views);
    });
  }

  public getBordersBiomes(t: any): Promise<View[]> {
    return new Promise((resolve: any) => {
      if (this.cache.borders.biomes) {
        resolve(this.cache.borders.biomes);
      } else {
        axios
          .get('/data/biomes.pbf', { responseType: 'arraybuffer' })
          .then((response: AxiosResponse) => {
            const geojson = geobuf.decode(new Pbf(response.data));
            const biomes = geojson;

            const views = [
              {
                name: t('Drawer.SideContent.border.chips.1.name'),
                label: t('Drawer.SideContent.border.chips.1.label'),
                type: ViewType.BORDER,
                description: t('Drawer.SideContent.border.chips.1.description'),
                visible: true,
                data: biomes as GeoJSON.GeoJsonObject,
                style: {
                  type: MapPropsViewStyleValueType.STRING,
                  key: 'nm',
                  value: [
                    {
                      valueString: 'Mata Atlântica',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#d7fcae',
                      },
                    },
                    {
                      valueString: 'Pampa',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#fcefd4',
                      },
                    },
                    {
                      valueString: 'Pantanal',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#ffe7ff',
                      },
                    },
                    {
                      valueString: 'Amazônia',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#b2ff1b',
                      },
                    },
                    {
                      valueString: 'Caatinga',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#feffb1',
                      },
                    },
                    {
                      valueString: 'Cerrado',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#ffc6b2',
                      },
                    },
                  ],
                },
              },
            ];

            this.cache.borders.biomes = views;
            resolve(views);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      }
    });
  }

  public getBordersBrazil(t: any): Promise<View[]> {
    return new Promise((resolve: any) => {
      if (this.cache.borders.brazil) {
        resolve(this.cache.borders.brazil);
      } else {
        axios
          .get('/data/brazil.pbf', { responseType: 'arraybuffer' })
          .then((response: AxiosResponse) => {
            const geojson = geobuf.decode(new Pbf(response.data));
            const brazil = geojson;

            const views = [
              {
                name: t('Drawer.SideContent.border.chips.2.name'),
                label: t('Drawer.SideContent.border.chips.2.label'),
                type: ViewType.BORDER,
                description: t('Drawer.SideContent.border.chips.2.description'),
                visible: false,
                data: brazil as GeoJSON.GeoJsonObject,
                style: {
                  type: MapPropsViewStyleValueType.ANY,
                  key: MapPropsViewStyleValueType.ANY,
                  value: [
                    {
                      valueString: 'Brazil',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#336f28',
                      },
                    },
                  ],
                },
              },
            ];

            this.cache.borders.brazil = views;
            resolve(views);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      }
    });
  }

  public getBordersRegions(t: any): Promise<View[]> {
    return new Promise((resolve: any) => {
      if (this.cache.borders.regions) {
        resolve(this.cache.borders.regions);
      } else {
        axios
          .get('/data/regions.pbf', { responseType: 'arraybuffer' })
          .then((response: AxiosResponse) => {
            const geojson = geobuf.decode(new Pbf(response.data));
            const regions = geojson;

            const views = [
              {
                name: t('Drawer.SideContent.border.chips.3.name'),
                label: t('Drawer.SideContent.border.chips.3.label'),
                type: ViewType.BORDER,
                description: t('Drawer.SideContent.border.chips.3.description'),
                visible: false,
                data: regions as GeoJSON.GeoJsonObject,
                style: {
                  type: MapPropsViewStyleValueType.STRING,
                  key: 'nm',
                  value: [
                    {
                      valueString: 'Norte',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#7fc97f',
                      },
                    },
                    {
                      valueString: 'Nordeste',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#fdc086',
                      },
                    },
                    {
                      valueString: 'Centro-Oeste',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#beaed4',
                      },
                    },
                    {
                      valueString: 'Sul',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#ffff99',
                      },
                    },
                    {
                      valueString: 'Sudeste',
                      style: {
                        color: defaultViewStyleProps.color,
                        weight: defaultViewStyleProps.weight,
                        fillOpacity: defaultViewStyleProps.fillOpacity,
                        fillColor: '#386cb0',
                      },
                    },
                  ],
                },
              },
            ];

            this.cache.borders.regions = views;
            resolve(views);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      }
    });
  }

  public getBordersStates(t: any): Promise<View[]> {
    return new Promise((resolve: any) => {
      if (this.cache.borders.states) {
        resolve(this.cache.borders.states);
      } else {
        axios
          .get('/data/states.pbf', { responseType: 'arraybuffer' })
          .then((response: AxiosResponse) => {
            const geojson = geobuf.decode(new Pbf(response.data));

            const brazilStates = geojson;
            const brazilStateColors = [
              '#399283',
              '#a20655',
              '#79eb99',
              '#2c457d',
              '#c7dd91',
              '#72359b',
              '#54d7eb',
              '#255026',
              '#ffb4a2',
              '#863c2c',
              '#8fec2f',
              '#7212ff',
              '#769d31',
              '#f996f1',
              '#21a708',
              '#c00018',
              '#abc8f5',
              '#3986da',
              '#fa41c7',
              '#d9dc22',
              '#fe707d',
              '#fea53b',
              '#848484',
            ];
            const brazilStatesNames = [
              'Acre',
              'Alagoas',
              'Amapá',
              'Amazonas',
              'Bahia',
              'Ceará',
              'Distrito Federal',
              'Espírito Santo',
              'Goiás',
              'Maranhão',
              'Mato Grosso',
              'Mato Grosso do Sul',
              'Minas Gerais',
              'Pará',
              'Paraíba',
              'Paraná',
              'Pernambuco',
              'Piauí',
              'Rio de Janeiro',
              'Rio Grande do Norte',
              'Rio Grande do Sul',
              'Rondônia',
              'Roraima',
              'Santa Catarina',
              'São Paulo',
              'Sergipe',
              'Tocantins',
            ];

            const brazilStatesStyles = brazilStateColors.map(
              (hexColor: string, i) => {
                const stateName = brazilStatesNames[i];

                return {
                  valueString: stateName,
                  style: {
                    color: defaultViewStyleProps.color,
                    weight: defaultViewStyleProps.weight,
                    fillOpacity: defaultViewStyleProps.fillOpacity,
                    fillColor: hexColor,
                  },
                };
              },
            );

            const views = [
              {
                name: t('Drawer.SideContent.border.chips.4.name'),
                label: t('Drawer.SideContent.border.chips.4.label'),
                type: ViewType.BORDER,
                description: t('Drawer.SideContent.border.chips.4.description'),
                visible: false,
                data: brazilStates as GeoJSON.GeoJsonObject,
                style: {
                  type: MapPropsViewStyleValueType.STRING,
                  key: 'nm',
                  value: brazilStatesStyles,
                },
              },
            ];

            this.cache.borders.states = views;
            resolve(views);
          })
          .catch((error: AxiosError) => {
            console.log(error);
          });
      }
    });
  }

  public getBackgrounds(t: any): Promise<View[]> {
    return new Promise((resolve: any) => {
      const createStyle = (factor = 1, denominator = 1000, suffix = 'Mha') => {
        return {
          type: MapPropsViewStyleValueType.RANGE,
          key: 'band',
          value: [
            {
              valueRange: {
                start: 0.01,
                end: (1.22 * (1 / 9) * 100 * factor) / denominator,
              },
              displayValueSuffix: ` ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#ffffe5',
              },
            },
            {
              valueRange: {
                start: (1.22 * (1 / 9) * 100 * factor) / denominator,
                end: (1.22 * (2 / 9) * 100 * factor) / denominator,
              },
              displayValueSuffix: ` ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#f7fcb9',
              },
            },
            {
              valueRange: {
                start: (1.22 * (2 / 9) * 100 * factor) / denominator,
                end: (1.22 * (3 / 9) * 100 * factor) / denominator,
              },
              displayValueSuffix: ` ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#d9f0a3',
              },
            },
            {
              valueRange: {
                start: (1.22 * (3 / 9) * 100 * factor) / denominator,
                end: (1.22 * (4 / 9) * 100 * factor) / denominator,
              },
              displayValueSuffix: ` ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#addd8e',
              },
            },
            {
              valueRange: {
                start: (1.22 * (4 / 9) * 100 * factor) / denominator,
                end: (1.22 * (5 / 9) * 100 * factor) / denominator,
              },
              displayValueSuffix: ` ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#78c679',
              },
            },
            {
              valueRange: {
                start: (1.22 * (5 / 9) * 100 * factor) / denominator,
                end: (1.22 * (6 / 9) * 100 * factor) / denominator,
              },
              displayValueSuffix: ` ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#41ab5d',
              },
            },
            {
              valueRange: {
                start: (1.22 * (6 / 9) * 100 * factor) / denominator,
                end: (1.22 * (7 / 9) * 100 * factor) / denominator,
              },
              displayValueSuffix: ` ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#238443',
              },
            },
            {
              valueRange: {
                start: (1.22 * (7 / 9) * 100 * factor) / denominator,
                end: (1.22 * (8 / 9) * 100 * factor) / denominator,
              },
              displayValueSuffix: ` ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#006837',
              },
            },
            {
              valueRange: {
                // start: (1.22 * (8 / 9) * 100 * factor) / denominator,
                // end: (1.22 * 100 * factor) / denominator,
                start: (1.22 * (8 / 9) * 100 * factor) / denominator,
                end: '',
              },
              displayValueSuffix: `1000.00 ${suffix}`,
              style: {
                color: defaultViewStyleProps.color,
                weight: defaultViewStyleProps.weight,
                fillOpacity: defaultViewStyleProps.fillOpacity,
                fillColor: '#004529',
              },
            },
          ],
        };
      };

      const resolution1x1km = t('Drawer.SideContent.background.chips.1.name');
      const resolution50x50km = t('Drawer.SideContent.background.chips.2.name');

      const views: any = [
        {
          name: t('Drawer.SideContent.background.chips.0.name'),
          label: t('Drawer.SideContent.background.chips.0.label'),
          type: ViewType.BACKGROUND,
          description: t('Drawer.SideContent.background.chips.0.description'),
          visible: false,
        },
        {
          name: resolution1x1km,
          label: t('Drawer.SideContent.background.chips.1.label'),
          type: ViewType.BACKGROUND,
          description: t('Drawer.SideContent.background.chips.1.description'),
          visible: false,
          url: `${process.env.REACT_APP_TILES_BASE_URL}/{scenario}/{attribute}/${resolution1x1km}/{year}/{z}/{x}/{y}.png`,
          style: createStyle(),
        },
        {
          name: resolution50x50km,
          label: t('Drawer.SideContent.background.chips.2.label'),
          type: ViewType.BACKGROUND,
          description: t('Drawer.SideContent.background.chips.2.description'),
          visible: true,
          url: `${process.env.REACT_APP_TILES_BASE_URL}/{scenario}/{attribute}/${resolution50x50km}/{year}/{z}/{x}/{y}.png`,
          style: createStyle(2500),
        },
      ];

      resolve(views);
    });
  }
}
