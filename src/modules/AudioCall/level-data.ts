type LevelDataType = {
  levelValue: string;
  levelTitle: string;
  levelName: string;
  levelId: string;
}[];

const levelData: LevelDataType = [
  {
    levelValue: '0',
    levelTitle: 'A1',
    levelName: 'Elementary',
    levelId: 'level-1',
  },
  {
    levelValue: '1',
    levelTitle: 'A2',
    levelName: 'Pre-Intermediate',
    levelId: 'level-2',
  },
  {
    levelValue: '2',
    levelTitle: 'B1',
    levelName: 'Intermediate',
    levelId: 'level-3',
  },
  {
    levelValue: '3',
    levelTitle: 'B2',
    levelName: 'Upper-Intermediate',
    levelId: 'level-4',
  },
  {
    levelValue: '4',
    levelTitle: 'C1',
    levelName: 'Advanced',
    levelId: 'level-5',
  },
  {
    levelValue: '5',
    levelTitle: 'C2',
    levelName: 'Super-Advanced',
    levelId: 'level-6',
  },
];

export default levelData;
