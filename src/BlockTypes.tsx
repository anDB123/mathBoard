
import { IntBlock } from "./FunctionBlocks/IntBlock"; import { SinBlock } from "./FunctionBlocks/SinBlock";
import { BracketBlock } from "./FunctionBlocks/BracketBlock";
import { FractionBlock } from "./InputBlocks/FractionBlock";
import { PowerBlock } from "./InputBlocks/PowerBlock";
import { SubBlock } from "./InputBlocks/SubBlock";
import { CosBlock } from "./FunctionBlocks/CosBlock";
import { DiffBlock } from "./FunctionBlocks/DiffBlock";
import { ExpBlock } from "./FunctionBlocks/ExpBlock";
import { LimitBlock } from "./FunctionBlocks/LimitBlock";
import { LogBlock } from "./FunctionBlocks/LogBlock";
import { MatrixBlock } from "./FunctionBlocks/MatrixBlock";
import { SqrtBlock } from "./FunctionBlocks/SqrtBlock";
import { SumBlock } from "./FunctionBlocks/SumBlock";
import { TanBlock } from "./FunctionBlocks/TanBlock";
import { TenPowerBlock } from "./FunctionBlocks/TenPowerBlock";
import { VectorBlock } from "./FunctionBlocks/VectorBlock";
import type AbstractBlock from "./AbstractBlock";

export const BlockTypes: (new (...args: any[]) => AbstractBlock)[] = [ //need to order these from most to least complex
    MatrixBlock,
    VectorBlock,
    IntBlock,
    DiffBlock,
    SinBlock,
    TanBlock,
    CosBlock,
    ExpBlock,
    LimitBlock,
    LogBlock,
    SqrtBlock,
    SumBlock,
    TenPowerBlock,
    SubBlock,
    BracketBlock,
    FractionBlock,
    PowerBlock,
]