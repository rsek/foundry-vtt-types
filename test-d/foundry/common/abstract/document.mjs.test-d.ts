import { expectType } from 'tsd';
import '../../../../index';
import EmbeddedCollection from '../../../../src/foundry/common/abstract/embedded-collection.mjs';
import { PropertiesToSource } from '../../../../src/types/helperTypes';
import { ActiveEffectDataProperties } from '../../../../src/foundry/common/data/data.mjs/activeEffectData';
import {
  EffectChangeData,
  EffectChangeDataProperties
} from '../../../../src/foundry/common/data/data.mjs/effectChangeData';

const baseActiveEffect = new foundry.documents.BaseActiveEffect();

expectType<EffectChangeDataProperties[]>(baseActiveEffect.toJSON().changes);
expectType<EffectChangeDataProperties[]>(baseActiveEffect.toObject().changes);
expectType<EffectChangeDataProperties[]>(baseActiveEffect.toObject(true).changes);
expectType<EffectChangeData[]>(baseActiveEffect.toObject(false).changes);

const item = await Item.create();

expectType<EmbeddedCollection<typeof ActiveEffect, foundry.data.ItemData>>(item.toObject(false).effects);
expectType<PropertiesToSource<ActiveEffectDataProperties>[]>(item.toObject().effects);

expectType<Promise<Macro>>(foundry.documents.BaseMacro.create());
expectType<Promise<Macro[]>>(foundry.documents.BaseMacro.createDocuments([]));
expectType<Promise<Macro[]>>(foundry.documents.BaseMacro.updateDocuments([]));
expectType<Promise<Macro[]>>(foundry.documents.BaseMacro.deleteDocuments([]));