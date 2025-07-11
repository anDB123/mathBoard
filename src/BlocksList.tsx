
import type AbstractBlock from "./AbstractBlock";
import { BracketBlock } from "./FunctionBlocks/BracketBlock";
import { CosBlock } from "./FunctionBlocks/CosBlock";
import { DiffBlock } from "./FunctionBlocks/DiffBlock";
import { ExpBlock } from "./FunctionBlocks/ExpBlock";
import { IntBlock } from "./FunctionBlocks/IntBlock";
import { LimitBlock } from "./FunctionBlocks/LimitBlock";
import { LogBlock } from "./FunctionBlocks/LogBlock";
import { MatrixBlock } from "./FunctionBlocks/MatrixBlock";
import { SinBlock } from "./FunctionBlocks/SinBlock";
import { SqrtBlock } from "./FunctionBlocks/SqrtBlock";
import { SumBlock } from "./FunctionBlocks/SumBlock";
import { TanBlock } from "./FunctionBlocks/TanBlock";
import { TenPowerBlock } from "./FunctionBlocks/TenPowerBlock";
import { VectorBlock } from "./FunctionBlocks/VectorBlock";
import { FractionBlock } from "./InputBlocks/FractionBlock";
import { PowerBlock } from "./InputBlocks/PowerBlock";
import { SubBlock } from "./InputBlocks/SubBlock";

export const BlocksList: Map<string, AbstractBlock> = new Map();
BlocksList.set('w', SinBlock);
BlocksList.set('e', CosBlock)
BlocksList.set('r', TanBlock)
BlocksList.set('t', ExpBlock)
BlocksList.set('y', LogBlock)
BlocksList.set('u', TenPowerBlock)
BlocksList.set('i', SubBlock)
BlocksList.set('g', DiffBlock)
BlocksList.set('h', IntBlock)
BlocksList.set('j', FractionBlock)
BlocksList.set('k', PowerBlock)
BlocksList.set('l', SqrtBlock)
BlocksList.set(';', BracketBlock)
BlocksList.set('v', LimitBlock)
BlocksList.set('b', SumBlock)
BlocksList.set('n', VectorBlock)
BlocksList.set('m', MatrixBlock)