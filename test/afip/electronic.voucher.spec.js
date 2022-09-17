/* eslint-disable no-undef */
const Afip = require('@afipsdk/afip.js');

jest.setTimeout(30000);

describe.skip('Módulo de Facturación Electrónica AFIP', ()=> {
	const afip = new Afip({ 
		CUIT: 20233374971,
		production : true,
	});

	it('Obtiene el último número de comprobante', async ()=> {
		const lastVoucher = await afip.ElectronicBilling.getLastVoucher(4,6); 
        
		expect(lastVoucher).toBe(610);
	});

	it('Obtener información de un comprobante', async ()=> {
		const voucherInfo = await afip.ElectronicBilling.getVoucherInfo(610,4,6);
        
		expect(voucherInfo).toBe(Object);
	});
});