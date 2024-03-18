import { restrict, substract } from "./index.js";

describe("restrict", () => {
  const symbol = Symbol("test");
  const parent = { parent: "parent" };
  test.each([
    { target: {}, template: {}, expected: {} },
    { target: {}, template: { a: {}, 1: [], [symbol]: 3 }, expected: {} },
    {
      target: { a: {}, 1: [], [symbol]: 3 },
      template: {},
      expected: { [symbol]: 3 },
    },
    {
      target: { a: {}, 1: [], [symbol]: 3 },
      template: { a: {} },
      expected: { a: {}, [symbol]: 3 },
    },
    {
      target: { a: {}, 1: [], [symbol]: 3 },
      template: { a: {}, 1: [] },
      expected: { a: {}, 1: [], [symbol]: 3 },
    },
    {
      target: { a: "", 1: [], [symbol]: 3 },
      template: { a: "", [symbol]: 3 },
      expected: { a: "", [symbol]: 3 },
    },
    {
      target: { a: "", 1: [], [symbol]: 3 },
      template: { 1: [], [symbol]: 3 },
      expected: { 1: [], [symbol]: 3 },
    },
    {
      target: Object.create(parent),
      template: parent,
      expected: Object.create(parent),
    },
    {
      target: Object.create(parent),
      template: {},
      expected: Object.create(parent),
    },
    {
      target: { parent: "parent" },
      template: Object.create(parent),
      expected: {},
    },
  ])(
    "$#: target,template,expected = {$target, $template, $expected}",
    ({ target, template, expected }) => {
      const result = restrict(target, template);
      expect(result).toBe(target);
      expect(result).toEqual(expected);
    }
  );
});

describe("substract", () => {
  const symbol = Symbol("test");
  const parent = { parent: "parent" };
  test.each([
    { target: {}, sources: {}, expected: {} },
    { target: {}, sources: { a: {}, 1: [], [symbol]: 3 }, expected: {} },
    {
      target: { a: {}, 1: [], [symbol]: 3 },
      sources: {},
      expected: { a: {}, 1: [], [symbol]: 3 },
    },
    {
      target: { a: {}, 1: [], [symbol]: 3 },
      sources: { a: {} },
      expected: { 1: [], [symbol]: 3 },
    },
    {
      target: { a: {}, 1: [], [symbol]: 3 },
      sources: { a: {}, 1: [] },
      expected: { [symbol]: 3 },
    },
    {
      target: { a: "", 1: [], [symbol]: 3 },
      sources: { a: "", [symbol]: 3 },
      expected: { 1: [], [symbol]: 3 },
    },
    {
      target: { a: "", 1: [], [symbol]: 3 },
      sources: { 1: [], [symbol]: 3 },
      expected: { a: "", [symbol]: 3 },
    },
    {
      target: Object.create(parent),
      sources: parent,
      expected: Object.create(parent),
    },
    {
      target: { parent: "parent" },
      sources: Object.create(parent),
      expected: { parent: "parent" },
    },
  ])(
    "$#: target,sources(1つ),expected = {$target, $sources, $expected}",
    ({ target, sources, expected }) => {
      const result = substract(target, sources);
      expect(result).toBe(target);
      expect(result).toEqual(expected);
    }
  );

  test.each([
    { target: {}, sources: [{}, {}], expected: {} },
    {
      target: { a: {}, 1: [], [symbol]: 3 },
      sources: [{ a: {} }, { 1: [] }],
      expected: { [symbol]: 3 },
    },
    {
      target: Object.create(parent),
      sources: [{}, parent],
      expected: Object.create(parent),
    },
    {
      target: { parent: "parent" },
      sources: [Object.create(parent), parent],
      expected: {},
    },
  ])(
    "$#: target,sources(2つ),expected = {$target, [$sources.0, $sources.1], $expected}",
    ({ target, sources, expected }) => {
      const result = substract(target, ...sources);
      expect(result).toBe(target);
      expect(result).toEqual(expected);
    }
  );
});
