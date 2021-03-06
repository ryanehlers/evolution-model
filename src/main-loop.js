//Elements learn by imitation but optimise for diversity

//Initialise vars
const probOfReproduce = 0.5;
const probOfImitateAdj = 1;
const probOfMutate = 0.001;
const probOfDeath = (ecosystem, value) =>
  numberOfOccurences(ecosystem, value) / 1000;

const numberOfOccurences = (array, element) =>
  array.filter(item => Math.round(item) === Math.round(element)).length;

const lifeCycleEvents = (ecosystem, index) => {
  const population = ecosystem.length;
  maybeImitateAdj(ecosystem, index);
  maybeMutate(ecosystem, index);
  maybeDie(ecosystem, index);
  didntDie(ecosystem, population) ? maybeReproduce(ecosystem, index) : 0;
  //Don't try to reproduce if dead
  return;
};

const checkIfEventOccurred = eventProbability =>
  Math.random() <= eventProbability;

const maybeReproduce = (ecosystem, index) =>
  checkIfEventOccurred(probOfReproduce) ? reproduce(ecosystem, index) : 0;

const maybeImitateAdj = (ecosystem, index) =>
  checkIfEventOccurred(probOfImitateAdj)
    ? imitateAdjacent(ecosystem, index)
    : 0;

const maybeMutate = (ecosystem, index) =>
  checkIfEventOccurred(probOfMutate) ? mutate(ecosystem, index) : 0;

const maybeDie = (ecosystem, index) =>
  checkIfEventOccurred(probOfDeath(ecosystem, ecosystem[index]))
    ? die(ecosystem, index)
    : 0;

const insertElementBefore = (arr, element, index) =>
  arr.splice(index, 0, element);

//const insertElementAfter = (arr, element, index) =>
//  arr.splice(index + 1, 0, element);

const reproduce = (ecosystem, index) =>
  insertElementBefore(ecosystem, ecosystem[index], index);

//increases or decreases value by 1
const mutate = (ecosystem, index) =>
  randomDirection() === 'before' ? ecosystem[index]-- : ecosystem[index]++;

const randomDirection = () => (Math.random() < 0.5 ? 'before' : 'after');

const imitate = (ecosystem, indexOfChangingEl, indexOfStaticEl) => {
  const diff = ecosystem[indexOfStaticEl] - ecosystem[indexOfChangingEl];
  ecosystem[indexOfChangingEl] += diff * 0.1;
};

const imitateAdjacent = (ecosystem, index) => {
  switch (true) {
    case typeof ecosystem[index - 1] === 'undefined' &&
      typeof ecosystem[index + 1] === 'undefined':
      return;

    case typeof ecosystem[index - 1] === 'undefined' &&
      typeof ecosystem[index + 1] !== 'undefined':
      imitate(ecosystem, index, index + 1);
      return;

    case typeof ecosystem[index + 1] === 'undefined' &&
      typeof ecosystem[index - 1] !== 'undefined':
      imitate(ecosystem, index, index - 1);
      return;

    default:
      randomDirection === 'before'
        ? imitate(ecosystem, index, index - 1)
        : imitate(ecosystem, index, index + 1);
      return;
  }
};

const die = (ecosystem, index) => ecosystem.splice(index, 1);

const didntDie = (ecosystem, population) => population === ecosystem.length;
const checkIfReproduced = (ecosystem, population) =>
  population === ecosystem.length;

const mainLoop = ecosystem => {
  for (let i = 0; i < ecosystem.length; i++) {
    const population = ecosystem.length;
    lifeCycleEvents(ecosystem, i);
    checkIfReproduced(ecosystem, population) ? i++ : 0;
  }
  return;
};

//export default mainLoop;

export default function main(totalEcosystem, maxCycles) {
  for (let i = 0; i < maxCycles; i++) {
    mainLoop(totalEcosystem);
    console.log(i);
  }
  return totalEcosystem;
}
