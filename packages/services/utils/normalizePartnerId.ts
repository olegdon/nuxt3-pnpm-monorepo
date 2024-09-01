export function normalizePartnerId(id: string) {
  return String(id)?.replace('/hinge/partner_vouchers/', '').replace(':hinge:partner_vouchers:', '').replace(':hinge:vouchers:', '')
}
